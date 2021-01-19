import datetime

from flask import (
    Blueprint, request, jsonify,
    send_from_directory)
import os
from flask import current_app as app
from db import db
from werkzeug.security import generate_password_hash
from utilities.constants import SECRET_KEY
from models import Account, Hostel, Tutor, Comment, Reply, Note, ProfilePic, Rider, Driver, HostelImage
from utilities.utility_methods import insert_into_db, password_matched, jwt_encode, find_id_by_email, jwt_decode, \
    dump_get_data_into_list, dump_tutors_into_list, dump_comments_into_list, allowed_file, dump_get_data_into_error, \
    dump_replies_into_list, dump_notes_into_list, allowed_img, dump_rider_into_list, base_url

bp = Blueprint('auth', __name__, url_prefix='/auth')

"""
This route register user
"""


@bp.route('/register', methods=['POST'])
def register():
    email = request.json['email']
    username = request.json['username']
    password = request.json['password']
    semester = request.json['semester']

    new_user = Account(email=email, UserName=username, Password=generate_password_hash(password), semester=semester)
    email_copy = bool(Account.query.filter_by(email=email).first())
    username_copy = bool(Account.query.filter_by(UserName=username).first())
    exist = email_copy or username_copy
    if not exist:
        insert_into_db(new_user)
        ID = Account.query.filter_by(UserName=username_copy).first().ID
        new_pic = ProfilePic(UserId=ID, path='1111.png')
        insert_into_db(new_pic)
        return {'error': 0,
                'msg': 'you can now log in to your account'}
    else:
        if username_copy:
            return {'exist': exist,
                    'msg': 'username already taken',
                    'error': 1,
                    }
        else:
            return {'exist': exist,
                    'msg': 'email already exist',
                    'error': 2
                    }


@bp.route('/login', methods=['POST'])
def login():
    email = request.json['email']
    password = request.json['password']
    email_matched = bool(Account.query.filter_by(email=email).first())
    if not email_matched:
        return {'error': 1}

    pas_matched = password_matched(password, email)
    if email_matched and pas_matched:
        payload = {'userid': find_id_by_email(email).ID,
                   'email': email
                   }
        jwt_token = jwt_encode(payload, SECRET_KEY)
        return {'token': jwt_token.decode(),
                'error': 0}
    else:
        return {'msg': 'username or password dosnt matched',
                'error': 1}


"""Hostel routes"""


@bp.route('/post_ads', methods=['POST'])
def store_add():
    token = request.environ.get("HTTP_AUTHORIZATION")
    if token:
        token = token.replace('Bearer ', "")
    else:
        return {'error': -1}
    decoded = jwt_decode(token, SECRET_KEY)
    user = dict(decoded)
    rooms = request.form['rooms']
    address = request.form['address']
    number = request.form['contact']
    new_ad = Hostel(UserId=user.get('userid'), rooms=rooms, address=address, Number=number)
    images = []
    imagefile1 = request.files.get('imagefile1')
    images.append(imagefile1)
    imagefile2 = request.files.get('imagefile2')
    images.append(imagefile2)
    imagefile3 = request.files.get('imagefile3')
    images.append(imagefile3)
    imagefile4 = request.files.get('imagefile4')
    images.append(imagefile4)
    paths = []
    for image in images:
        if allowed_img(image.filename):
            # if not os.path.isdir(final_path):
            #     os.mkdir(final_path)
            path = '{}-{}-{}'.format(datetime.datetime.now().timestamp(), user.get('userid', 0), image.filename)
            with open(path, 'wb') as temp_file:
                temp_file.write(image.read())
            paths.append(path)
            # file.save(final_path)
            # path = url_for(final_path, filename=file.filename)

    insert_into_db(new_ad)
    new_pic = HostelImage(HostelId=new_ad.HostelId, path1=paths[0], path2=paths[1], path3=paths[2], path4=paths[3])
    insert_into_db(new_pic)
    ad = {
        'user_id': new_ad.UserId,
        'datetime': new_ad.Datetime,
        'ad_id': new_ad.HostelId,
        'error': 0
    }
    return ad


@bp.route('/my_ads', methods=['GET'])
def my_ads():
    token = request.environ.get("HTTP_AUTHORIZATION")
    if token:
        token = token.replace('Bearer ', "")
    else:
        return {'error': -1}
    decoded = jwt_decode(token, SECRET_KEY)
    user = dict(decoded)
    ads = Hostel.query.filter_by(UserId=user.get('userid')).order_by(Hostel.Datetime.desc()).all()
    if not ads:
        return jsonify(dump_get_data_into_error())
    else:
        return jsonify(dump_get_data_into_list(ads))


@bp.route('/all_ads', methods=['GET'])
def get_all_ads():
    ads = Hostel.query.order_by(Hostel.Datetime.desc()).all()
    if not ads:
        return jsonify(dump_get_data_into_error())
    else:
        return jsonify(dump_get_data_into_list(ads))


@bp.route('/delete_my_ads', methods=['DELETE'])
def del_my_data():
    post_id = request.json['post_id']
    my_ad = Hostel.query.filter_by(HostelId=post_id).one()
    pics = HostelImage.query.filter_by(HostelId=post_id).one()
    db.session.delete(pics)
    db.session.commit()
    db.session.delete(my_ad)
    db.session.commit()
    return {'msg': 'this post is deleted',
            'status': 0}


"""update settings"""


@bp.route('/update_password', methods=['POST'])
def update_password():
    token = request.environ.get("HTTP_AUTHORIZATION")
    if token:
        token = token.replace('Bearer ', "")
    decoded = jwt_decode(token, SECRET_KEY)
    user = dict(decoded)
    new_password = request.json['password']
    Account.query.filter_by(ID=user.get('userid')). \
        update(dict(Password=generate_password_hash(new_password)))
    db.session.commit()
    ad = {'msg': 'Password is updated',
          'status': 0}
    return ad


@bp.route('/my_profile', methods=['GET'])
def profile():
    token = request.environ.get("HTTP_AUTHORIZATION")
    if token:
        token = token.replace('Bearer ', "")
    decoded = jwt_decode(token, SECRET_KEY)
    user = dict(decoded)
    my_profile = Account.query.filter_by(ID=user.get('userid')).first()
    pics = ProfilePic.query.filter_by(UserId=user.get('userid')).one()
    return {"email": my_profile.email,
            "name": my_profile.UserName,
            "semester": my_profile.semester,
            "ID": my_profile.ID,
            'image': base_url + pics.path}


@bp.route('/update_username', methods=['POST'])
def update_username():
    token = request.environ.get("HTTP_AUTHORIZATION")
    if token:
        token = token.replace('Bearer ', "")
    decoded = jwt_decode(token, SECRET_KEY)
    user = dict(decoded)
    new_username = request.json['username']
    Account.query.filter_by(ID=user.get('userid')). \
        update(dict(UserName=new_username))
    db.session.commit()
    return {'msg': 'username is updated',
            'status': 0,
            'new_username': new_username}


@bp.route('/update_semester', methods=['POST'])
def update_semester():
    token = request.environ.get("HTTP_AUTHORIZATION")
    if token:
        token = token.replace('Bearer ', "")
    decoded = jwt_decode(token, SECRET_KEY)
    user = dict(decoded)
    semester = request.json['semester']
    Account.query.filter_by(ID=user.get('userid')). \
        update(dict(semester=semester))
    db.session.commit()
    return {'msg': 'username is updated',
            'status': 0,
            'new_semester': semester}


"""tutors routes"""


@bp.route('/post_tutor', methods=['POST'])
def post_as_tutor():
    token = request.environ.get("HTTP_AUTHORIZATION")
    if token:
        token = token.replace('Bearer ', "")
    decoded = jwt_decode(token, SECRET_KEY)
    user = dict(decoded)
    name = request.json['name']
    email = request.json['email']
    department = request.json['department']
    description = request.json['description']
    semester = Account.query.filter_by(ID=user.get('userid')).first().semester
    new_tutor = Tutor(UserId=user.get('userid'), FullName=name, email=email, Department=department,
                      Semester=semester,
                      Description=description)
    insert_into_db(new_tutor)
    tutor = {
        'user_id': new_tutor.UserId,
        'datetime': new_tutor.Datetime,
        'ad_id': new_tutor.TutorId
    }
    return tutor


@bp.route('/all_tutors', methods=['GET'])
def get_all_tutors():
    ads = Tutor.query.order_by(Tutor.Datetime.desc()).all()
    if not ads:
        return jsonify(dump_get_data_into_error())
    else:
        return jsonify(dump_tutors_into_list(ads))


@bp.route('/my_tutors_post', methods=['GET'])
def my_tutor_pots():
    token = request.environ.get("HTTP_AUTHORIZATION")
    if token:
        token = token.replace('Bearer ', "")
    decoded = jwt_decode(token, SECRET_KEY)
    user = dict(decoded)
    ads = Tutor.query.filter_by(UserId=user.get('userid')).order_by(Tutor.Datetime.desc()).all()
    if not ads:
        return jsonify(dump_get_data_into_error())
    else:
        return jsonify(dump_tutors_into_list(ads))


@bp.route('/delete_my_tutor_post', methods=['DELETE'])
def dell_my_data():
    post_id = request.json['post_id']
    my_ad = Tutor.query.filter_by(TutorId=post_id).one()
    db.session.delete(my_ad)
    db.session.commit()
    return {'msg': 'this post is deleted',
            'status': 0}


"""comment routes"""


@bp.route('/add_comment', methods=['POST'])
def ad_comment():
    token = request.environ.get("HTTP_AUTHORIZATION")
    if token:
        token = token.replace('Bearer ', "")
    decoded = jwt_decode(token, SECRET_KEY)
    user = dict(decoded)
    comment = request.json['comment']
    new_comment = Comment(UserId=user.get('userid'), Comment=comment)
    insert_into_db(new_comment)
    ad = {'status': 0,
          'msg': "comment is added"}
    return ad


@bp.route('/all_comments', methods=['GET'])
def get_all_comments():
    ads = Comment.query.order_by(Comment.Datetime.desc()).all()
    if not ads:
        return jsonify(dump_get_data_into_error())
    else:
        return jsonify(dump_comments_into_list(ads))


"""reply routes"""


@bp.route('/add_reply', methods=['POST'])
def add_reply():
    token = request.environ.get("HTTP_AUTHORIZATION")
    if token:
        token = token.replace('Bearer ', "")
    decoded = jwt_decode(token, SECRET_KEY)
    user = dict(decoded)
    reply = request.json['reply']
    comment_id = request.json['comment_id']
    new_reply = Reply(UserId=user.get('userid'), CommentId=comment_id, Reply=reply)
    insert_into_db(new_reply)
    return {'status': 0,
            'msg': "reply is added"}


@bp.route('/on_comment_reply', methods=['POST'])
def get_replies():
    cmnt_id = request.json['cmnt_id']
    ads = Reply.query.filter_by(CommentId=cmnt_id).order_by(Reply.Datetime.desc()).all()
    if ads:
        return jsonify(dump_replies_into_list(ads))
    else:
        return jsonify(dump_get_data_into_error())


"""notes route"""


@bp.route('/add_notes', methods=['POST'])
def add_notes():
    token = request.environ.get("HTTP_AUTHORIZATION")
    if token:
        token = token.replace('Bearer ', "")
    decoded = jwt_decode(token, SECRET_KEY)
    user = dict(decoded)
    final_path = os.path.join(app.config['UPLOAD_FOLDER'], str(user.get('userid')))
    file = request.files['file']
    department = request.form['department']
    subject = request.form['subject']
    description = request.form['description']
    semester = request.form['semester']
    if allowed_file(file.filename):
        # if not os.path.isdir(final_path):
        #     os.mkdir(final_path)
        path = '{}-{}-{}'.format(datetime.datetime.now().timestamp(), user.get('userid', 0), file.filename)
        with open(path, 'wb') as temp_file:
            temp_file.write(file.read())
        # file.save(final_path)
        # path = url_for(final_path, filename=file.filename)
        new_notes = Note(UserId=user.get('userid'), Department=department,
                         subject=subject, Description=description, path=path,
                         Semester=semester)
        insert_into_db(new_notes)
        return {'path': new_notes.path,
                'Notes_id': new_notes.NotesId}
    else:
        return {'status': 1,
                'msg': 'file is not pdf'}


@bp.route('/download/<int:note_id>', methods=['GET'])
def download_note(note_id):
    note = Note.get_by_id(note_id)
    if note:
        return send_from_directory(directory='.', filename=note.path)
    else:
        return {"msg": "No note found against {}".format(note_id)}


@bp.route('/my_notes', methods=['GET'])
def my_notes():
    token = request.environ.get("HTTP_AUTHORIZATION")
    if token:
        token = token.replace('Bearer ', "")
    decoded = jwt_decode(token, SECRET_KEY)
    user = dict(decoded)
    ads = Note.query.filter_by(UserId=user.get('userid')).order_by(Note.Datetime.desc()).all()
    if not ads:
        return jsonify(dump_get_data_into_error())
    else:
        return jsonify(dump_notes_into_list(ads))


@bp.route('/delete_my_notes', methods=['DELETE'])
def dell_my_notes():
    post_id = request.json['post_id']
    my_ad = Note.query.filter_by(NotesId=post_id).one()
    db.session.delete(my_ad)
    db.session.commit()
    return {'msg': 'this post is deleted',
            'status': 0}


@bp.route('/search_notes/<int:semester>/<department>', methods=['GET'])
def search_notes(semester, department):
    # semester = request.json['semester']
    # department = request.json['department']
    ads = Note.query.filter_by(Semester=semester, Department=department).order_by(Note.Datetime.desc()).all()
    if not ads:
        return jsonify(dump_get_data_into_error())
    else:
        return jsonify(dump_notes_into_list(ads))


@bp.route('/search_by_subject_notes/<int:semester>/<department>/<subject>', methods=['GET'])
def search_by_sub_notes(semester, department, subject):
    # semester = request.json['semester']
    # department = request.json['department']
    ads = Note.query.filter_by(Semester=semester, Department=department, subject=subject).order_by(
        Note.Datetime.desc()).all()
    if not ads:
        return jsonify(dump_get_data_into_error())
    else:
        return jsonify(dump_notes_into_list(ads))


"""profile picture routes"""


@bp.route('/upload_pic', methods=['POST'])
def upld_pic():
    token = request.environ.get("HTTP_AUTHORIZATION")
    if token:
        token = token.replace('Bearer ', "")
    decoded = jwt_decode(token, SECRET_KEY)
    user = dict(decoded)
    final_path = os.path.join(app.config['UPLOAD_FOLDER'], str(user.get('userid')))
    imagefile = request.files.get('imagefile', '')
    name = imagefile.filename
    if allowed_img(name):
        # if not os.path.isdir(final_path):
        #     os.mkdir(final_path)
        path = '{}-{}-{}'.format(datetime.datetime.now().timestamp(), user.get('userid', 0), imagefile.filename)
        with open(path, 'wb') as temp_file:
            temp_file.write(imagefile.read())
        # file.save(final_path)
        # path = url_for(final_path, filename=file.filename)
        picture_count = ProfilePic.query.filter_by(UserId=user.get('userid')).all()
        if len(picture_count) > 0:
            picture = ProfilePic.query.filter_by(UserId=user.get('userid')).first()
            db.session.delete(picture)
            db.session.commit()
        new_pic = ProfilePic(UserId=user.get('userid'), path=path)
        insert_into_db(new_pic)
        return {'path': new_pic.path,
                'pic_id': new_pic.UserId}
    else:
        return {'status': 1,
                'msg': 'file is not picture'
                }


@bp.route('/get_picture/<int:user_id>', methods=['GET'])
def get_pic(user_id):
    image = ProfilePic.query.filter_by(UserId=user_id).first()
    if image:
        image_file = send_from_directory(directory='.', filename=image.path)
        return image_file
    else:
        image_file = send_from_directory(directory='.', filename="1111.png")
        return image_file


@bp.route('/get_ads_picture/<path>', methods=['GET'])
def get_ad_pic(path):
    image_file = send_from_directory(directory='.', filename=path)
    return image_file


"""carpool routes"""


@bp.route('/add_rider', methods=['POST'])
def ad_rider():
    token = request.environ.get("HTTP_AUTHORIZATION")
    if token:
        token = token.replace('Bearer ', "")
    decoded = jwt_decode(token, SECRET_KEY)
    user = dict(decoded)
    pickup = request.json['pickup']
    pic_long = request.json['pic_long']
    pic_lat = request.json['pic_lat']
    destination = request.json['destination']
    des_long = request.json['des_long']
    des_lat = request.json['des_lat']
    status = Rider.query.filter_by(user_id=user.get('userid')).first()
    if not bool(status):
        new_rider = Rider(user_id=user.get('userid'), pickup=pickup, destination=destination, destination_long=des_long,
                          destination_lat=des_lat, pickup_long=pic_long, pickup_lat=pic_lat)
        insert_into_db(new_rider)
        return {'status': 0,
                'msg': "rider is added"}
    else:
        status = status.status
    if not status == 0:
        new_rider = Rider(user_id=user.get('userid'), pickup=pickup, destination=destination, destination_long=des_long,
                          destination_lat=des_lat, pickup_long=pic_long, pickup_lat=pic_lat)
    else:
        return {'status': 1,
                'msg': "rider add is active already"}
    if not insert_into_db(new_rider):
        response = {'status': 0,
                    'msg': "rider is added"}
    else:
        response = {'status': 0,
                    'msg': "could not add rider"}

    return response


@bp.route('/add_driver', methods=['POST'])
def ad_driver():
    token = request.environ.get("HTTP_AUTHORIZATION")
    if token:
        token = token.replace('Bearer ', "")
    decoded = jwt_decode(token, SECRET_KEY)
    user = dict(decoded)
    pickup = request.json['pickup']
    pic_long = request.json['pic_long']
    pic_lat = request.json['pic_lat']
    destination = request.json['destination']
    des_long = request.json['des_long']
    des_lat = request.json['des_lat']
    car_number = request.json['car_number']
    seats = request.json['seats']
    status = Driver.query.filter_by(user_id=user.get('userid')).first()
    if not bool(status):
        new_rider = Driver(user_id=user.get('userid'), pickup=pickup, destination=destination,
                           car_number=car_number, seats=seats, destination_long=des_long, destination_lat=des_lat,
                           pickup_long=pic_long, pickup_lat=pic_lat)
        insert_into_db(new_rider)
        return {'status': 0,
                'msg': "driver is added"}
    else:
        status = status.status
    if not status == 0:
        new_rider = Driver(user_id=user.get('userid'), pickup=pickup, destination=destination,
                           car_number=car_number, seats=seats, destination_long=des_long, destination_lat=des_lat,
                           pickup_long=pic_long, pickup_lat=pic_lat)
    else:
        return {'status': 1,
                'msg': "driver add is active already"}
    if not insert_into_db(new_rider):
        response = {'status': 0,
                    'msg': "driver is added"}
    else:
        response = {'status': 0,
                    'msg': "could not add driver"}

    return response


@bp.route('/all_riders_uni', methods=['GET'])
def get_all_riders():
    ads = Rider.query.order_by(Rider.rider_id.desc()).all()
    if not ads:
        return jsonify(dump_get_data_into_error())
    else:
        return jsonify(dump_rider_into_list(ads))


@bp.route('/all_riders_home', methods=['GET'])
def get_all_riders_home():
    token = request.environ.get("HTTP_AUTHORIZATION")
    if token:
        token = token.replace('Bearer ', "")
    decoded = jwt_decode(token, SECRET_KEY)
    user = dict(decoded)
    destination = Driver.query.filter_by(user_id=user.get('userid')).first().destination
    ads = Rider.query.filter_by(destination=destination).order_by(Rider.rider_id.desc()).all()
    if not ads:
        return jsonify(dump_get_data_into_error())
    else:
        return jsonify(dump_rider_into_list(ads))


@bp.route('/finish_ride', methods=['DELETE'])
def finish_ride():
    post_id = request.json['']
    my_ad = Rider.query.filter_by(riderid=post_id).one()
    db.session.delete(my_ad)
    db.session.commit()
    return {'msg': 'this post is deleted',
            'status': 0}


"""report routs"""


@bp.route('/report_comment', methods=['POST'])
def report():
    comment_id = request.json['comment_id']
    status = Comment.query.filter_by(CommentId=comment_id).first().status
    if status == 0:
        Comment.query.filter_by(CommentId=comment_id). \
            update(dict(status=1))
        db.session.commit()
        return {'msg': 'comment is reported',
                'status': Comment.query.filter_by(CommentId=comment_id).first().status}
    else:
        return {
            'status': 0
        }


@bp.route('/like_comment', methods=['POST'])
def like_comment():
    comment_id = request.json['comment_id']
    likes = Comment.query.filter_by(CommentId=comment_id).first().likes
    if likes == 0:
        Comment.query.filter_by(CommentId=comment_id). \
            update(dict(likes=1))
        db.session.commit()
        return {'msg': 'comment is liked',
                'status': Comment.query.filter_by(CommentId=comment_id).first().likes}
    else:
        return {
            'status': 0
        }

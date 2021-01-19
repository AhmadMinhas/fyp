from werkzeug.security import check_password_hash
import jwt
from db import db
from models import Account
from utilities.constants import ALLOWED_EXTENSIONS, ALLOWED_EXTENSIONS_IMG
from models import HostelImage, ProfilePic

base_url = 'http://192.168.0.14:5000/auth/get_ads_picture/'


def insert_into_db(data):
    db.session.add(data)
    db.session.commit()


def delete_from_db(data):
    db.session.delete(data)
    db.session.commit()


def password_matched(password, email):
    matched = check_password_hash(find_id_by_email(email).Password, password)
    return matched


def find_id_by_email(email):
    user = Account.query.filter_by(email=email).first_or_404()
    return user


def jwt_encode(payload, secret_key):
    encoded_jwt = jwt.encode(payload, secret_key, algorithm='HS256')
    return encoded_jwt


def dump_get_data_into_list(data):
    all_ads = []
    for single_ad in data:
        pics = HostelImage.query.filter_by(HostelId=single_ad.HostelId).one()
        temp_ad = {'rooms': single_ad.rooms,
                   'address': single_ad.address,
                   'contact': single_ad.Number,
                   'ad_id': single_ad.HostelId,
                   'datetime': single_ad.Datetime,
                   'image1': base_url+pics.path1,
                   'image2': base_url+pics.path2,
                   'image3': base_url+pics.path3,
                   'image4': base_url+pics.path4}
        all_ads.append(temp_ad)
    return all_ads


def dump_get_data_into_error():
    all_ads = []
    temp_ad = {'rooms': 0,
               'address': 'none',
               'contact': 'none',
               'msg': 'you have no content',
               'datetime': 'none',
               'ad_id': -1,
               'tutor_id': -1,
               'fullname': 'none',
               'department': 'none',
               'semester': 0,
               'description': 'none',
               'email': 'none',
               'username': 'none',
               'comment': 'no comments available',
               'NotesId': -1,
               "comment_id": -1,
               "check": -1
               }
    all_ads.append(temp_ad)
    return all_ads


def dump_tutors_into_list(data):
    all_ads = []
    for single_ad in data:
        pics = ProfilePic.query.filter_by(UserId=single_ad.UserId).one()
        temp_ad = {'fullname': single_ad.FullName,
                   'department': single_ad.Department,
                   'semester': single_ad.Semester,
                   'tutor_id': single_ad.TutorId,
                   'datetime': single_ad.Datetime,
                   'description': single_ad.Description,
                   'email': single_ad.email,
                   'user_id': single_ad.UserId,
                   'image': base_url+pics.path}
        all_ads.append(temp_ad)
    return all_ads


def dump_notes_into_list(data):
    all_ads = []
    for single_ad in data:
        pics = ProfilePic.query.filter_by(UserId=single_ad.UserId).one()
        temp_ad = {'NotesId': single_ad.NotesId,
                   'department': single_ad.Department,
                   'semester': single_ad.Semester,
                   'datetime': single_ad.Datetime,
                   'description': single_ad.Description,
                   'subject': single_ad.subject,
                   'user_id': single_ad.UserId,
                   'image': base_url+pics.path}
        all_ads.append(temp_ad)
    return all_ads


def dump_comments_into_list(data):
    all_ads = []
    for single_ad in data:
        pics = ProfilePic.query.filter_by(UserId=single_ad.UserId).one()
        temp_ad = {"comment_id": single_ad.CommentId,
                   "email": Account.query.filter_by(ID=single_ad.UserId).first().email,
                   "likes": single_ad.likes,
                   "comment": single_ad.Comment,
                   "username": "@" + Account.query.filter_by(ID=single_ad.UserId).first().UserName,
                   "datetime": single_ad.Datetime,
                   'image': base_url+pics.path}
        all_ads.append(temp_ad)
    return all_ads


def dump_rider_into_list(data):
    all_ads = []
    for single_ad in data:
        pics = ProfilePic.query.filter_by(UserId=single_ad.user_id).one()
        temp_ad = {"rider_id": single_ad.rider_id,
                   "email": Account.query.filter_by(ID=single_ad.user_id).first().email,
                   "pickup": single_ad.pickup,
                   "destination": single_ad.destination,
                   "des_long": single_ad.destination_long,
                   "des_lat": single_ad.destination_lat,
                   "pick_long": single_ad.pickup_long,
                   "pick_lat": single_ad.pickup_lat,
                   "username": "@" + Account.query.filter_by(ID=single_ad.user_id).first().UserName,
                   'image': base_url+pics.path}
        all_ads.append(temp_ad)
    return all_ads


def dump_replies_into_list(data):
    all_ads = []
    for single_ad in data:
        temp_ad = {
            "check": 0,
            "comment": single_ad.Reply,
            "username": Account.query.filter_by(ID=single_ad.UserId).first().UserName,
            "datetime": single_ad.Datetime}
        all_ads.append(temp_ad)
    return all_ads


def jwt_decode(token, secret_key):
    decoded = jwt.decode(token, secret_key, algorithms='HS256')
    return decoded


def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


def allowed_img(imagename):
    return '.' in imagename and \
           imagename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS_IMG

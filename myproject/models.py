"""
This module contains the model classes
"""
from datetime import datetime

from db import db


class Account(db.Model):
    __tablename__ = 'account'

    ID = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(200), nullable=False)
    UserName = db.Column(db.String(255), nullable=False)
    Password = db.Column(db.String(255), nullable=False)
    semester = db.Column(db.Integer, server_default=db.FetchedValue())
    Datetime = db.Column(db.DateTime, default=datetime.now)


class Comment(db.Model):
    __tablename__ = 'comment'

    CommentId = db.Column(db.Integer, primary_key=True)
    UserId = db.Column(db.ForeignKey('account.ID'), nullable=False, index=True)
    likes = db.Column(db.Integer, server_default=db.FetchedValue())
    Comment = db.Column(db.String(250))
    status = db.Column(db.Integer, server_default=db.FetchedValue())
    Datetime = db.Column(db.DateTime, default=datetime.now)

    account = db.relationship('Account', primaryjoin='Comment.UserId == Account.ID', backref='comments')


class Driver(db.Model):
    __tablename__ = 'driver'

    driver_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.ForeignKey('account.ID'), nullable=False, index=True)
    destination = db.Column(db.String(250), nullable=False)
    destination_long = db.Column(db.String(250), nullable=False)
    destination_lat = db.Column(db.String(250), nullable=False)
    pickup = db.Column(db.String(100), nullable=False)
    pickup_long = db.Column(db.String(100), nullable=False)
    pickup_lat = db.Column(db.String(100), nullable=False)
    status = db.Column(db.Integer, server_default=db.FetchedValue())
    car_number = db.Column(db.String(250), nullable=False)
    seats = db.Column(db.String(100), nullable=False)

    user = db.relationship('Account', primaryjoin='Driver.user_id == Account.ID', backref='drivers')


class Hostel(db.Model):
    __tablename__ = 'hostel'

    HostelId = db.Column(db.Integer, primary_key=True)
    UserId = db.Column(db.ForeignKey('account.ID'), nullable=False, index=True)
    rooms = db.Column(db.Integer, nullable=False)
    Number = db.Column(db.String(250), nullable=False)
    address = db.Column(db.String(250))
    gender = db.Column(db.String(50))
    status = db.Column(db.Integer, server_default=db.FetchedValue())
    Datetime = db.Column(db.DateTime, default=datetime.now)

    account = db.relationship('Account', primaryjoin='Hostel.UserId == Account.ID', backref='hostels')


class HostelImage(db.Model):
    __tablename__ = 'hostel_images'

    image_id = db.Column(db.Integer, primary_key=True)
    HostelId = db.Column(db.ForeignKey('hostel.HostelId'), nullable=False, index=True)
    path1 = db.Column(db.String(600))
    path2 = db.Column(db.String(600))
    path3 = db.Column(db.String(600))
    path4 = db.Column(db.String(600))

    hostel = db.relationship('Hostel', primaryjoin='HostelImage.HostelId == Hostel.HostelId', backref='hostel_images')


class Note(db.Model):
    __tablename__ = 'notes'

    NotesId = db.Column(db.Integer, primary_key=True)
    UserId = db.Column(db.ForeignKey('account.ID'), nullable=False, index=True)
    Department = db.Column(db.String(100), nullable=False)
    subject = db.Column(db.String(100), nullable=False)
    Semester = db.Column(db.Integer, nullable=False)
    Description = db.Column(db.String(250))
    status = db.Column(db.Integer, server_default=db.FetchedValue())
    path = db.Column(db.String(600))
    Datetime = db.Column(db.DateTime, default=datetime.now)

    account = db.relationship('Account', primaryjoin='Note.UserId == Account.ID', backref='notes')

    @classmethod
    def get_by_id(cls, note_id):
        """
        This will return note against id
        """
        return cls.query.filter(cls.NotesId == note_id).first()


class ProfilePic(db.Model):
    __tablename__ = 'profile_pic'

    pic_id = db.Column(db.Integer, primary_key=True)
    path = db.Column(db.String(600))
    UserId = db.Column(db.ForeignKey('account.ID'), nullable=False, index=True)

    account = db.relationship('Account', primaryjoin='ProfilePic.UserId == Account.ID', backref='profile_pics')


class Reply(db.Model):
    __tablename__ = 'reply'

    ReplyId = db.Column(db.Integer, primary_key=True)
    UserId = db.Column(db.ForeignKey('account.ID'), nullable=False, index=True)
    CommentId = db.Column(db.ForeignKey('comment.CommentId'), nullable=False, index=True)
    Reply = db.Column(db.String(250))
    status = db.Column(db.Integer, server_default=db.FetchedValue())
    Datetime = db.Column(db.DateTime, default=datetime.now)

    comment = db.relationship('Comment', primaryjoin='Reply.CommentId == Comment.CommentId', backref='replies')
    account = db.relationship('Account', primaryjoin='Reply.UserId == Account.ID', backref='replies')


class Tutor(db.Model):
    __tablename__ = 'tutor'

    TutorId = db.Column(db.Integer, primary_key=True)
    UserId = db.Column(db.ForeignKey('account.ID'), nullable=False, index=True)
    FullName = db.Column(db.String(250), nullable=False)
    Department = db.Column(db.String(100), nullable=False)
    Semester = db.Column(db.Integer, nullable=False)
    email = db.Column(db.String(200), nullable=False)
    Description = db.Column(db.String(250))
    status = db.Column(db.Integer, server_default=db.FetchedValue())
    Datetime = db.Column(db.DateTime, default=datetime.now)

    account = db.relationship('Account', primaryjoin='Tutor.UserId == Account.ID', backref='tutors')


class Rider(db.Model):
    __tablename__ = 'rider'

    rider_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.ForeignKey('account.ID'), nullable=False, index=True)
    destination = db.Column(db.String(250), nullable=False)
    destination_long = db.Column(db.String(250), nullable=False)
    destination_lat = db.Column(db.String(250), nullable=False)
    pickup = db.Column(db.String(100), nullable=False)
    pickup_long = db.Column(db.String(100), nullable=False)
    pickup_lat = db.Column(db.String(100), nullable=False)
    status = db.Column(db.Integer, server_default=db.FetchedValue())

    user = db.relationship('Account', primaryjoin='Rider.user_id == Account.ID', backref='riders')
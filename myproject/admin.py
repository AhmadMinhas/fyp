from flask_admin.contrib.sqla import ModelView
from flask_admin import Admin
from app import app
from db import db
from models import Account, Hostel, Tutor, Comment, Reply, Note, ProfilePic, Rider, Driver


admin = Admin(app, name='microblog', template_mode='bootstrap3')
admin.add_view(ModelView(Hostel, db.session))
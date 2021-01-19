from flask_admin.contrib.sqla import ModelView
from flask_admin import Admin
from app import app
from db import db
from models import Account, Hostel, Tutor, Comment, Reply, Note, ProfilePic, Rider, Driver, HostelImage


admin = Admin(app, name='Student Facilitator Admin ', template_mode='bootstrap3')
admin.add_view(ModelView(Account, db.session))
admin.add_view(ModelView(Hostel, db.session))
admin.add_view(ModelView(Tutor, db.session))
admin.add_view(ModelView(Comment, db.session))
admin.add_view(ModelView(Reply, db.session))
admin.add_view(ModelView(Note, db.session))
admin.add_view(ModelView(ProfilePic, db.session))
admin.add_view(ModelView(Rider, db.session))
admin.add_view(ModelView(Driver, db.session))
admin.add_view(ModelView(HostelImage, db.session))


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)

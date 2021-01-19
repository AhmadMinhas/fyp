from flask import Flask
from db import db
from views import bp

app = Flask(__name__)
app.secret_key = 'super secret key'
app.config['SESSION_TYPE'] = 'filesystem'
app.config.from_envvar('APPLICATION_SETTINGS')
app.config['FLASK_ADMIN_SWATCH'] = 'cerulean'
db.init_app(app)
app.register_blueprint(bp)

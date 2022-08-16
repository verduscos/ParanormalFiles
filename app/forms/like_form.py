from flask_wtf import FlaskForm
from wtforms import IntegerField
from wtforms.validators import DataRequired

class LikeForm(FlaskForm):
  user_id = IntegerField(validators=[DataRequired()])
  sighting_id = IntegerField(validators=[DataRequired()])

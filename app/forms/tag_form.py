from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Length

class TagForm(FlaskForm):
  title = StringField(
          "Title",
          validators=[
              DataRequired("Tag title cannot be empty"),
              Length(min=3, max=25, message="Title must be between 3 and 25 characters.")
          ]
      )

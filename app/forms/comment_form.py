from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Length

class CommentForm(FlaskForm):
    comment = StringField(
        "Comment",
        validators=[
            DataRequired("Comment cannot be empty"),
            Length(min=4, max=1000, message="Comment must be between 4 and 1000 characters.")
        ]
    )

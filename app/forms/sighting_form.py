from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Length


class SightingForm(FlaskForm):
    date = StringField(
        "Date",
        validators=[
            DataRequired("Please provide a date."),
            Length(min=10, max=10, message="Invalid Date")
        ]
    )
    location = StringField(
        "Date",
        validators=[
            Length(min=5, max=25 , message="Please provide valid coordinates")
        ]
    )
    title = StringField(
        "Title",
        validators=[
            DataRequired("Please provice a title."),
            Length(min=5, max=100, message="Title must be between 5 - 100 characters.")
        ]
    )
    description = StringField(
        "Description",
        validators=[
            DataRequired("Please provide a description."),
            Length(min=5, max=2000, message="Description must be between 5 - 2000 characters.")
        ]
    )
    category = StringField(
        "Category",
        validators=[
            DataRequired("Please choose a category")
        ]
    )

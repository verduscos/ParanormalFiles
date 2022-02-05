from .db import db
from flask_login import UserMixin

class Comment(db.Model, UserMixin):
    __tablename__ = "comments"

    id = db.Column(db.Integer, primary_key=True)
    comment = db.Column(db.String(1000))
    created_at = db.Column(db.DateTime, default=db.func.now(), nullable=False)
    updated_at = db.Column(db.DateTime, default=db.func.now(), nullable=False)

    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    story_id = db.Column(db.Column, db.ForeignKey("stories.id"))


    def to_dict(self):
        return {
            "id": self.id,
            "comment": self.comment,
            "created_at": self.created_at,
            "user_id": self.user_id,
            "story_id": self.story_id
        }

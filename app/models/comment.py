from .db import db

class Comment(db.Model):
    __tablename__ = "comments"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    sighting_id = db.Column(db.Integer, db.ForeignKey("sightings.id", ondelete="CASCADE"), nullable=False)
    comment = db.Column(db.String(1000), nullable=False)
    created_at = db.Column(db.DateTime, default=db.func.now(), nullable=False)
    updated_at = db.Column(db.DateTime, default=db.func.now(), nullable=False)

    user = db.relationship("User", back_populates="comments")
    sighting = db.relationship("Sighting", back_populates="comments")

    def to_dict(self):
        return {
            "id": self.id,
            "comment": self.comment,
            "user_id": self.user_id,
            "sighting_id": self.sighting_id,
            "updated_at": self.updated_at,
            "created_at": self.created_at,
            "username": self.user.username
        }

    @staticmethod
    def update(comment, **kwargs):
        for key, value in kwargs.items():
            setattr(comment, key, value)
        return comment

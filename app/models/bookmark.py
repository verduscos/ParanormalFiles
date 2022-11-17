from .db import db

class Bookmark(db.Model):
    __tablename__ = "bookmarks"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    sighting_id = db.Column(db.Integer, db.ForeignKey("sightings.id", ondelete="CASCADE"), nullable=False)
    created_at = db.Column(db.DateTime, default=db.func.now(), nullable=False)
    updated_at = db.Column(db.DateTime, default=db.func.now(), nullable=False)

    user = db.relationship("User", back_populates="bookmarks")
    sighting = db.relationship("Sighting", back_populates="bookmarks")


    def to_dict(self):
      return {
        "id": self.sighting.id,
        "sighting_id": self.sighting_id,
        "user_id": self.user_id,
        "title":  self.sighting.title,
        "description": self.sighting.description,
        "created_at": self.sighting.created_at,
        "image_url": self.sighting.image_url,
        "username": self.sighting.user.username,
        "sighting_tags": [tag.to_dict() for tag in self.sighting.sighting_tags]
      }

from .db import db

class Like(db.Model):
    __tablename__ = "likes"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    sighting_id = db.Column(db.Integer, db.ForeignKey("sightings.id", ondelete="CASCADE"), nullable=False)
    created_at = db.Column(db.DateTime, default=db.func.now(), nullable=False)
    updated_at = db.Column(db.DateTime, default=db.func.now(), nullable=False)

    user = db.relationship("User", back_populates="likes")
    sighting = db.relationship("Sighting", back_populates="likes")


    def to_dict(self):
      return {
        "id": self.sighting.id,
        "sighting_id": self.sighting_id,
        "user_id": self.user_id,
        "title":  self.sighting.title,
        "description": self.sighting.description,
        "created_at": self.sighting.created_at,
        "category": self.sighting.category,
        "image_url": self.sighting.image_url,
        "username": self.sighting.user.username
      }

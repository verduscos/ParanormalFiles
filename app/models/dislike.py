from .db import db, environment, SCHEMA, add_prefix_for_prod

class Dislike(db.Model):
    __tablename__ = "dislikes"
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    sighting_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("sightings.id"), ondelete="CASCADE"), nullable=False)
    created_at = db.Column(db.DateTime, default=db.func.now(), nullable=False)
    updated_at = db.Column(db.DateTime, default=db.func.now(), nullable=False)

    user = db.relationship("User", back_populates="dislikes")
    sighting = db.relationship("Sighting", back_populates="dislikes")


    def to_dict(self):
      return {
        "id": self.sighting.id,
        "sighting_id": self.sighting_id,
        "user_id": self.user_id,
        "created_at": self.sighting.created_at,
        "updated_at": self.sighting.updated_at,
      }

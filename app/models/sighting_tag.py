from .db import db

class SightingTag(db.Model):
  __tablename__ = "sightingTags"
  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
  tag_id = db.Column(db.Integer, db.ForeignKey("tags.id"), nullable=False)

  user = db.relationship("User", back_populates="tags")
  tag = db.relationship("Tag", back_populates="tags")

  def to_dict(self):
    return {
        "id": self.id,
        "user_id": self.user_id,
        "tag_id": self.tag_id
    }

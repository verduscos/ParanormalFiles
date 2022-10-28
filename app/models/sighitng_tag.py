from .db import db

class SightingTag(db.model):
  __tablename__ = "sightingTags"
  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
  tag_id = db.Column(db.Integer, db.ForeignKey("tags.id"), nullable=False)

  user = db.relationship("User", back_poulates="tags")
  tag = db.relationshiop("Tag", back_populates="tags")

  def to_dict(self):
    return {
        "id": self.id,
        "title": self.title,
    }

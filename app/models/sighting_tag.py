from .db import db

class SightingTag(db.Model):
  __tablename__ = "sighting_tags"
  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
  tag_id = db.Column(db.Integer, db.ForeignKey("tags.id"), nullable=False)

  def to_dict(self):
    return {
        "id": self.id,
        "user_id": self.user_id,
        "tag_id": self.tag_id
    }

from .db import db

class SightingTag(db.Model):
  __tablename__ = "sighting_tags"
  id = db.Column(db.Integer, primary_key=True)
  sighting_id = db.Column(db.Integer, db.ForeignKey("sightings.id"), nullable=False)
  tag_id = db.Column(db.Integer, db.ForeignKey("tags.id"), nullable=False)

  def to_dict(self):
    return {
        "id": self.id,
        "sighting_id": self.sighting_id,
        "tag_id": self.tag_id
    }

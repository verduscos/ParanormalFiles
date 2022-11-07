from .db import db

class SightingTag(db.Model):
  __tablename__ = "sighting_tags"
  id = db.Column(db.Integer, primary_key=True)
  sighting_id = db.Column(db.Integer, db.ForeignKey("sightings.id", ondelete="CASCADE"), nullable=False)
  tag_id = db.Column(db.Integer, db.ForeignKey("tags.id"), nullable=False)

  sighting = db.relationship("Sighting", back_populates="sighting_tags")
  tags = db.relationship("Tag", back_populates="sighting_tags")

  def to_dict(self):
    return self.tags.title

  def to_dict_all(self):
    return {
    "id": self.id,
    "sighting_id": self.sighting_id,
    "tag_id": self.tag_id,
  }

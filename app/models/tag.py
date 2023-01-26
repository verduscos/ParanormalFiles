from .db import db

class Tag(db.Model):
  __tablename__ = "tags"
  if environment == "production":
        __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  title = db.Column(db.String(25), nullable=False)

  sighting_tags = db.relationship("SightingTag", back_populates="tags")


  def to_dict(self):
    return {
        "id": self.id,
        "title": self.title,
    }

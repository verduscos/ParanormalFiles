from .db import db, environment, SCHEMA, add_prefix_for_prod

class SightingImage(db.Model):
    __tablename__ = "sighting_images"
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    sighting_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("sightings.id"), ondelete="CASCADE"), nullable=False)
    image_url = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=db.func.now(), nullable=False)
    updated_at = db.Column(db.DateTime, default=db.func.now(), nullable=False)

    sighting = db.relationship("Sighting", back_populates="sighting_images")

    def to_dict(self):
        return {
            "id": self.id,
            "image_url": self.image_url,
        }

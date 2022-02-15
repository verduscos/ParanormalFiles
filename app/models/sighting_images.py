from.db import db

class SightingImage(db.model):
    __tablename__ = "sighting_images"

    id = db.Column(db.Integer, primary_key=True)
    sighting_id = db.Column(db.Interger, db.ForeignKey("sightings.id"), nullable=False)
    image_url = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=db.func.now(), nullable=False)
    updated_at = db.Column(db.DateTime, default=db.func.now(), nullable=False)

    sighting = db.relationship("Sighting", back_populates="sighting_images")

    def to_dict(self):
        return {
            "id": self.id,
            "image_url": self.image_url,
        }

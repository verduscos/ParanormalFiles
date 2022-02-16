from .db import db

class Sighting(db.Model):
    __tablename__ = "sightings"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    date = db.Column(db.String(15), nullable=False)
    location = db.Column(db.String(50), nullable=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(2000), nullable=False)
    category = db.Column(db.String(50), nullable=False)
    created_at = db.Column(db.DateTime, default=db.func.now(), nullable=False)
    updated_at = db.Column(db.DateTime, default=db.func.now(), nullable=False)

    user = db.relationship("User", back_populates="sightings")
    comments = db.relationship("Comment", cascade="all, delete", passive_deletes=True, back_populates="sighting")
    sighting_images = db.relationship("SightingImage",  cascade="all, delete", passive_deletes=True, back_populates="sighting")
    likes = db.relationship("Like", cascade="all, delete", passive_deletes=True, back_populates="sighting")


    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "date" : self.date,
            "location": self.location,
            "title": self.title,
            "description": self.description,
            "category": self.category,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
        }

    @staticmethod
    def update(sighting, **kwargs):
        for key, value in kwargs.items():
            setattr(sighting, key, value)

        return sighting

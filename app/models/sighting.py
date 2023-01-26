from .db import db, environment, SCHEMA, add_prefix_for_prod

class Sighting(db.Model):
    __tablename__ = "sightings"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(5000), nullable=False)
    image_url = db.Column(db.String(1000), nullable=True)
    created_at = db.Column(db.DateTime, default=db.func.now(), nullable=False)
    updated_at = db.Column(db.DateTime, default=db.func.now(), nullable=False)

    user = db.relationship("User", back_populates="sightings")
    comments = db.relationship("Comment", cascade="all, delete", passive_deletes=True, back_populates="sighting")
    sighting_tags = db.relationship("SightingTag", cascade="all, delete", passive_deletes=True, back_populates="sighting")
    sighting_images = db.relationship("SightingImage",  cascade="all, delete", passive_deletes=True, back_populates="sighting", lazy='dynamic')
    likes = db.relationship("Like", cascade="all, delete", passive_deletes=True, back_populates="sighting")
    dislikes = db.relationship("Dislike", cascade="all, delete", passive_deletes=True, back_populates="sighting")
    bookmarks = db.relationship("Bookmark", cascade="all, delete", passive_deletes=True, back_populates="sighting")


    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "title": self.title,
            "description": self.description,
            "image_url": self.image_url,
            "sighting_images": [sighting_image.image_url for sighting_image in self.sighting_images],
            "created_at": self.created_at,
            "updated_at": self.updated_at,
            "username": self.user.username,
            "likes": len(self.likes),
            "dislikes": len(self.dislikes),
            "comments": [comment.to_dict() for comment in self.comments],
            "sighting_tags": [tag.to_dict() for tag in self.sighting_tags]
        }

    @staticmethod
    def update(sighting, **kwargs):
        for key, value in kwargs.items():
            setattr(sighting, key, value)
        return sighting

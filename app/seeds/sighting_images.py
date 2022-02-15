from app.models import db, SightingImage

def seed_sighting_images():
    image1 = SightingImage(
        sighting_id=1,
        image_url="imageUrlHere"
    )

    image2 = SightingImage(
        sighting_id=1,
        image_url="imageUrlHere"
    )

    image3 = SightingImage(
        sighting_id=1,
        image_url="imageUrlHere"
    )

    db.session.add(image1)
    db.session.add(image2)
    db.session.add(image3)

    db.session.commit()

def undo_sighting_images():
    db.session.execute('TRUNCATE sighting_images RESTART IDENTITY CASCADE;')
    db.session.commit()

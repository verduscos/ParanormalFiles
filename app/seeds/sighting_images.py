from app.models import db, SightingImage

def seed_sighting_images():
    image1 = SightingImage(
        sighting_id=1,
        image_url="https://medium-clone-photo-bucket.s3.us-west-1.amazonaws.com/neonbrand-iVyaBBZTG30-unsplash.jpg"
    )

    image2 = SightingImage(
        sighting_id=2,
        image_url="https://medium-clone-photo-bucket.s3.us-west-1.amazonaws.com/charles-deluvio-pcZvxrAyYoQ-unsplash+(1).jpg"
    )

    image3 = SightingImage(
        sighting_id=3,
        image_url="https://medium-clone-photo-bucket.s3.us-west-1.amazonaws.com/jp-valery-G42kwj5T0No-unsplash.jpg"
    )

    image4 = SightingImage(
        sighting_id=4,
        image_url="https://medium-clone-photo-bucket.s3.us-west-1.amazonaws.com/jr-korpa-tzQkuviIuHU-unsplash.jpg"
    )

    image5 = SightingImage(
        sighting_id=5,
        image_url="https://medium-clone-photo-bucket.s3.us-west-1.amazonaws.com/photo-1468571660253-56820125cd07.jfif"
    )

    db.session.add(image1)
    db.session.add(image2)
    db.session.add(image3)
    db.session.add(image4)
    db.session.add(image5)

    db.session.commit()

def undo_sighting_images():
    db.session.execute('TRUNCATE sighting_images RESTART IDENTITY CASCADE;')
    db.session.commit()

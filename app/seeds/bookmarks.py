from app.models import db, Bookmark

def seed_bookmarks():
    bookmark1 = Bookmark(
        user_id=1,
        sighting_id=2,
    )

    bookmark2 = Bookmark(
        user_id=1,
        sighting_id=1,
    )

    bookmark3 = Bookmark(
        user_id=1,
        sighting_id=5,
    )


    db.session.add(bookmark1)
    db.session.add(bookmark2)
    db.session.add(bookmark3)

    db.session.commit()

def undo_bookmarks():
    db.session.execute('TRUNCATE sightings RESTART IDENTITY CASCADE;')
    db.session.commit()

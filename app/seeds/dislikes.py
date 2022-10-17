from app.models import db, Dislike

def seed_dislikes():
    dislike1 = Dislike(
        user_id=1,
        sighting_id=2,
    )

    dislike2 = Dislike(
        user_id=2,
        sighting_id=1,
    )

    dislike3 = Dislike(
        user_id=3,
        sighting_id=2,
    )


    db.session.add(dislike1)
    db.session.add(dislike2)
    db.session.add(dislike3)

    db.session.commit()

def undo_dislikes():
    db.session.execute('TRUNCATE dislikes RESTART IDENTITY CASCADE;')
    db.session.commit()

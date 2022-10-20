from app.models import db, Like

def seed_likes():
    like1 = Like(
        user_id=1,
        sighting_id=2,
    )

    like2 = Like(
        user_id=2,
        sighting_id=1,
    )

    like3 = Like(
        user_id=3,
        sighting_id=2,
    )


    db.session.add(like1)
    db.session.add(like2)
    db.session.add(like3)

    db.session.commit()

    # for n in range(15):
    #   like = Like(
    #     user_id=1,
    #     sighting_id=n,
    #   )

    #   db.session.add(like)
    #   db.session.commit()


def undo_likes():
    db.session.execute('TRUNCATE sightings RESTART IDENTITY CASCADE;')
    db.session.commit()

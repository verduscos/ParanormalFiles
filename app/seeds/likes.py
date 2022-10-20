from app.models import db, Like

def seed_likes():
    for num in range(1, 16):
      like1 = Like(
        user_id=2,
        sighting_id=num,
      )

      like2 = Like(
        user_id=3,
        sighting_id=num,
      )

      like3 = Like(
        user_id=4,
        sighting_id=num,
      )

      like4 = Like(
        user_id=5,
        sighting_id=num,
      )

      db.session.add(like1)
      db.session.add(like2)
      db.session.add(like3)
      db.session.add(like4)
      db.session.commit()


def undo_likes():
    db.session.execute('TRUNCATE sightings RESTART IDENTITY CASCADE;')
    db.session.commit()

from app.models import db, Dislike

def seed_dislikes():
    for num in range(1, 16):
      like = Dislike(
        user_id=6,
        sighting_id=num,
      )

      db.session.add(like)
      db.session.commit()

def undo_dislikes():
    db.session.execute('TRUNCATE dislikes RESTART IDENTITY CASCADE;')
    db.session.commit()

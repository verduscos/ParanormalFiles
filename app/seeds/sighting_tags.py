from app.models import db, SightingTag

def seed_sighting_tags():
  tag1 = SightingTag(
    sighting_id=1,
    tag_id=3
  )
  tag2 = SightingTag(
    sighting_id=2,
    tag_id=4
  )
  tag3 = SightingTag(
    sighting_id=3,
    tag_id=1
  )
  tag4 = SightingTag(
    sighting_id=4,
    tag_id=3
  )
  tag5 = SightingTag(
    sighting_id=5,
    tag_id=1
  )

  db.session.add(tag1)
  db.session.add(tag2)
  db.session.add(tag3)
  db.session.add(tag4)
  db.session.add(tag5)
  db.session.commit()

def undo_sighting_tags():
  db.session.execute('TRUNCATE sighting_tags RESTART IDENTITY CASCADE;')
  db.session.commit()

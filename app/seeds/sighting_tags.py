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

  tag6 = SightingTag(
    sighting_id=6,
    tag_id=4
  )

  tag7 = SightingTag(
    sighting_id=7,
    tag_id=4
  )

  tag8 = SightingTag(
    sighting_id=8,
    tag_id=6
  )

  tag9 = SightingTag(
    sighting_id=9,
    tag_id=7
  )

  tag10 = SightingTag(
    sighting_id=10,
    tag_id=3
  )

  tag11 = SightingTag(
    sighting_id=11,
    tag_id=8
  )

  tag12 = SightingTag(
    sighting_id=12,
    tag_id=9
  )

  tag13 = SightingTag(
    sighting_id=13,
    tag_id=4
  )

  tag14 = SightingTag(
    sighting_id=14,
    tag_id=3
  )

  tag15 = SightingTag(
    sighting_id=15,
    tag_id=2
  )

  tag16 = SightingTag(
    sighting_id=12,
    tag_id=5
  )

  tag17 = SightingTag(
    sighting_id=1,
    tag_id=10
  )


  db.session.add(tag1)
  db.session.add(tag2)
  db.session.add(tag3)
  db.session.add(tag4)
  db.session.add(tag5)
  db.session.add(tag6)
  db.session.add(tag7)
  db.session.add(tag8)
  db.session.add(tag9)
  db.session.add(tag10)
  db.session.add(tag11)
  db.session.add(tag12)
  db.session.add(tag13)
  db.session.add(tag14)
  db.session.add(tag15)
  db.session.add(tag16)
  db.session.add(tag17)
  db.session.commit()

def undo_sighting_tags():
  db.session.execute('TRUNCATE sighting_tags RESTART IDENTITY CASCADE;')
  db.session.commit()

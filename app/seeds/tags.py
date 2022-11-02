from app.models import db, Tag

def seed_tags():
      tag1 = Tag(
        title="ufos",
      )

      tag2 = Tag(
        title="aliens",
      )

      tag3 = Tag(
        title="ghosts",
      )

      tag4 = Tag(
        title="demons",
      )

      tag5 = Tag(
        title="synchronicity",
      )

      tag6 = Tag(
        title="angels",
      )

      tag7 = Tag(
        title="monsters",
      )

      tag8 = Tag(
        title="psychics",
      )

      tag9 = Tag(
        title="mandela",
      )

      tag10 = Tag(
        title="reincarnation",
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
      db.session.commit()

def undo_tags():
    db.session.execute('TRUNCATE tags RESTART IDENTITY CASCADE;')
    db.session.commit()

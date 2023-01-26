from flask.cli import AppGroup
from .users import seed_users, undo_users
from .sightings import seed_sightings, undo_sightings
from .comments import seed_comments, undo_comments
from .likes import seed_likes, undo_likes
from .dislikes import seed_dislikes, undo_dislikes
from .bookmarks import seed_bookmarks, undo_bookmarks
from .sighting_images import seed_sighting_images, undo_sighting_images
from .tags import seed_tags, undo_tags
from .sighting_tags import seed_sighting_tags, undo_sighting_tags
# render
from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
      # Before seeding, truncate all tables prefixed with schema name
      db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
      db.session.execute(f"TRUNCATE table {SCHEMA}.sightings RESTART IDENTITY CASCADE;")
      db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
      db.session.execute(f"TRUNCATE table {SCHEMA}.likes RESTART IDENTITY CASCADE;")
      db.session.execute(f"TRUNCATE table {SCHEMA}.dislikes RESTART IDENTITY CASCADE;")
      db.session.execute(f"TRUNCATE table {SCHEMA}.bookmarks RESTART IDENTITY CASCADE;")
      db.session.execute(f"TRUNCATE table {SCHEMA}.sighting_images RESTART IDENTITY CASCADE;")
      db.session.execute(f"TRUNCATE table {SCHEMA}.tags RESTART IDENTITY CASCADE;")
      db.session.execute(f"TRUNCATE table {SCHEMA}.sighting_tags RESTART IDENTITY CASCADE;")
      # Add a truncate command here for every table that will be seeded.
      db.session.commit()
    seed_users()
    seed_sightings()
    seed_comments()
    seed_likes()
    seed_dislikes()
    seed_bookmarks()
    seed_sighting_images()
    seed_tags()
    seed_sighting_tags()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_sightings()
    undo_comments()
    undo_likes()
    undo_dislikes()
    undo_bookmarks()
    undo_sighting_images()
    undo_tags()
    undo_sighting_tags()
    # Add other undo functions here

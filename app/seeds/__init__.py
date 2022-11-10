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

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
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

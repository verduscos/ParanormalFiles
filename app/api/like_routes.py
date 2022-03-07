from flask import Blueprint, session, request
from app.models import Like, User, db

like_routes = Blueprint("likes", __name__)


@like_routes.route("/<int:sightingId>")
def get_likes(sightingId):
  """
  Get all likes for a specific sightings.
  """
  likes = Like.query.filter(Like.sighting_id == sightingId).all()
  total_likes = len(likes)
  print("WE HIT IT")
  print(total_likes)

  return {"likes": total_likes}

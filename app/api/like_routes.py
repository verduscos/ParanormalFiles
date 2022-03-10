from flask import Blueprint, session, request
from app.forms import LikeForm
from app.models import Like, User, db

like_routes = Blueprint("likes", __name__)


@like_routes.route("/<int:userId>")
def get_likes(userId):
  """
  Get all user favorites.
  """
  likes = Like.query.filter(Like.user_id == userId).all()
  # total_likes = len(likes)

  return {"likes": [like.to_dict() for like in likes]}


@like_routes.route("<int:sightingId>", methods=["POST"])
def post_like(sightingId):
  """
  Post a like to a specific sighting.
  """
  form = LikeForm()
  form["csrf_token"].data = request.cookies["csrf_token"]
  if form.validate_on_submit():
    searchExists = Like.query.filter(Like.user_id == request.json["user_id"], Like.sighting_id == request.json["sighting_id"]).first()
    if searchExists is None:
      like = Like(
        user_id=request.json["user_id"],
        sighting_id=request.json["sighting_id"]
      )
      db.session.add(like)
      db.session.commit()

      return { "likes" : like.to_dict() }

  return { "likes" : "post to likes failed." }


@like_routes.route("<int:sightingId>", methods=["DELETE"])
def delete_like(sightingId):
  """
  Delete a like for a specific sighting.
  """
  form = LikeForm()
  form["csrf_token"].data = request.cookies["csrf_token"]
  if form.validate_on_submit():
    searchExists = Like.query.filter(Like.user_id == request.json["user_id"], Like.sighting_id == request.json["sighting_id"]).first()

    if searchExists is not None:

      db.session.delete(searchExists)
      db.session.commit()

      return { "likes" : "like deleted" }

  return { "likes" : "delete to likes failed." }

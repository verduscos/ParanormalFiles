from flask import Blueprint, session, request
from app.forms import LikeForm
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


@like_routes.route("<int:sightingId>", methods=["POST"])
def post_like(sightingId):
  """
  Post a like to a specific sighting.
  """
  form = LikeForm()
  form["csrf_token"].data = request.cookies["csrf_token"]
  if form.validate_on_submit():
    searchExists = Like.query.filter(Like.user_id == request.json["user_id"] and Like.sighting_id == request.json["sighting_id"]).first()
    print(type(searchExists))
    if searchExists is None:
      like = Like(
        user_id=request.json["user_id"],
        sighting_id=request.json["sighting_id"]
      )
      # db.session.add(like)
      # db.session.commit()
      print("IN HRERERER")

      return { "likes" : like.to_dict() }

  return { "likes" : "post to likes failed." }

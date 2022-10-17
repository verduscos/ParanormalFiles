from flask import Blueprint, session, request
from app.forms import LikeForm
from app.models import Like, User, db

like_routes = Blueprint("likes", __name__)


@like_routes.route("/<int:sightingId>")
def get_likes(sightingId):
  """
  Get likes for a sighting.
  """
  likes = Like.query.filter(Like.sighting_id == sightingId).count()

  return {"likes": likes}


@like_routes.route("/", methods=["POST"])
def post_like():
  """
  Post a like to a specific sighting.
  """
  form = LikeForm()
  form["csrf_token"].data = request.cookies["csrf_token"]

  if form.validate_on_submit():
    like = Like(
      user_id=request.json["user_id"],
      sighting_id=request.json["sighting_id"]
    )
    db.session.add(like)
    db.session.commit()
    return { "likes" : "post successful" }
  return { "likes" : "post failed." }


@like_routes.route("/", methods=["DELETE"])
def delete_like():
  """
  Delete a like for a specific sighting.
  """
  searchExists = Like.query.filter(Like.user_id == request.json["user_id"], Like.sighting_id == request.json["sighting_id"]).first()
  if searchExists is not None:
    db.session.delete(searchExists)
    db.session.commit()
    return { "deleted" : searchExists.sighting_id }

  return { "likes" : "delete to likes failed." }

from flask import Blueprint, request
from app.forms import DislikeForm
from app.models import Dislike, db

dislike_routes = Blueprint("dislikes", __name__)

@dislike_routes.route("/<int:sightingId>")
def get_dislikes(sightingId):
  """
  Get dislikes for a sighting.
  """
  dislikes = Dislike.query.filter(Dislike.sighting_id == sightingId).count()

  return {"dislikes": dislikes}


@dislike_routes.route("/", methods=["POST"])
def post_dislike():
  """
  Post a dislike.
  """
  form = DislikeForm()
  form["csrf_token"].data = request.cookies["csrf_token"]
  if form.validate_on_submit():
    alreadyDisliked = Dislike.query.filter(Dislike.user_id == request.json["user_id"], Dislike.sighting_id == request.json["sighting_id"]).first()
    if alreadyDisliked is None:
      like = Dislike(
        user_id=request.json["user_id"],
        sighting_id=request.json["sighting_id"]
      )
      db.session.add(like)
      db.session.commit()
      return { "dislikes" : "post successful" }
  return { "dislikes" : "post failed." }


@dislike_routes.route("/", methods=["DELETE"])
def delete_dislike():
  """
  Delete a dislike for a specific sighting.
  """
  print("DELETE DISLIKE--------------------------------------------")
  searchExists = Dislike.query.filter(Dislike.user_id == request.json["user_id"], Dislike.sighting_id == request.json["sighting_id"]).first()
  if searchExists is not None:
    db.session.delete(searchExists)
    db.session.commit()
    return { "deleted" : searchExists.sighting_id }

  return { "likes" : "delete to likes failed." }

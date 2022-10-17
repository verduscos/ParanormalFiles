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


@dislike_routes.route("/<int:sightingId>")
def post_dislike(sightingId):
  """
  Post a dislike.
  """
  form = DislikeForm()
  form["csrf_token"].data = request.cookies["csrf_token"]
  if form.validate_on_submit():
    searchExists = Like.query.filter(Like.user_id == request.json["user_id"], Like.sighting_id == request.json["sighting_id"]).first()

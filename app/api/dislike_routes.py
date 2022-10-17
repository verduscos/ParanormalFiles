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

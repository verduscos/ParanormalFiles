from flask import Blueprint
from app.models import Sighting, db

sighting_routes = Blueprint("sightings", __name__)


@sighting_routes.route("/")
def get_sightings():
    return {"inside": "sightings route"}

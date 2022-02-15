from flask import Blueprint
from app.models import Sighting, db

sighting_routes = Blueprint("sightings", __name__)


@sighting_routes.route("/")
def get_sightings():
    """
    Get all reviews in DB, will use on splash page.
    """
    sightings = Sighting.query.all()
    return {"sightings": [sighting.to_dict() for sighting in sightings]}


@sighting_routes.route("/<int:id>")
def get_sighting_by_id(id):
    """
    Return a sighting by id.
    """
    sighting = Sighting.query.get(id)
    return sighting.to_dict()


@sighting_routes.route("")

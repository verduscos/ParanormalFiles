from flask import Blueprint, session, request
from app.forms import SightingForm
from app.models import Sighting, SightingImage, db
from app.s3_helpers import (
    upload_file_to_s3, allowed_file, get_unique_filename)

sighting_routes = Blueprint("sightings", __name__)


@sighting_routes.route("/test")
def get_sightings_test():

    # THIS IS NOT WORKING
    sightings = Sighting.query.join(SightingImage).filter(
      Sighting.id == 2
    ).all()

    print("TESTING")
    print({"sightings": [sighting.to_dict() for sighting in sightings]})
    return {"sightings": [sighting.to_dict() for sighting in sightings]}


@sighting_routes.route("/")
def get_sightings():
    """
    Get all sightings in DB, will use on splash page.
    """
    sightings = Sighting.query.join(SightingImage).filter(
      Sighting.id == 2
    ).all()

    return {"sightings": [sighting.to_dict() for sighting in sightings]}


@sighting_routes.route("/<int:id>")
def get_sighting_by_id(id):
    """
    Return a sighting by id.
    """
    sighting = Sighting.query.get(id)
    return sighting.to_dict()


@sighting_routes.route("/<int:id>/images")
def get_sighting_images(id):
    """
    Return images associated with sighting
    """
    images = SightingImage.query.filter(SightingImage.sighting_id == id).all()
    return {"images": [image.to_dict() for image in images]}


@sighting_routes.route("/", methods=["POST"])
def create_sighting():
    """
    Create a sighting.
    """
    form = SightingForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        sighting = Sighting(
            user_id=request.json["user_id"],
            date=request.json["date"],
            # location=request.json["location"],
            title=request.json["title"],
            description=request.json["description"],
            category=request.json["category"]
        )
        db.session.add(sighting)
        db.session.commit()

        return sighting.to_dict()
    return {"errors": form.errors}, 400


@sighting_routes.route("/<int:id>", methods=["PUT"])
def update_sighting(id):
    """
    Update an existing sighting.
    """
    form = SightingForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    sighting = Sighting.query.get(id)

    if form.validate_on_submit():
        updated_sighting = Sighting.update(
            sighting=sighting,
            user_id=request.json["user_id"],
            date=request.json["date"],
            location=request.json["location"],
            title=request.json["title"],
            description=request.json["description"],
            category=request.json["category"]
        )

        db.session.add(updated_sighting)
        db.session.commit()

        return sighting.to_dict()
    return {"errors": form.errors}, 400


@sighting_routes.route("/<int:id>", methods=["DELETE"])
def delete_sighting(id):
    """
    Delete a specific sighting.
    """
    sighting = Sighting.query.get(id)
    if sighting:

        db.session.delete(sighting)
        db.session.commit()

        return {"found": f"{id}"}
    return {errors: "Sighting not found."}, 400


# IMAGES
@sighting_routes.route("/<int:sightingId>/image", methods=["POST"])
# @login_required
def upload_image(sightingId):
    if "image" not in request.files:
        return {"errors": "image required"}, 400

    image = request.files["image"]

    if not allowed_file(image.filename):
        return {"errors": "file type not permitted"}, 400

    image.filename = get_unique_filename(image.filename)

    upload = upload_file_to_s3(image)

    if "url" not in upload:
        # if the dictionary doesn't have a url key
        # it means that there was an error when we tried to upload
        # so we send back that error message
        print('HER')
        return upload, 400

    url = upload["url"]
    # flask_login allows us to get the current user from the request
    new_image = SightingImage(sighting_id=sightingId, image_url=url)
    db.session.add(new_image)
    db.session.commit()
    return {"url": url}

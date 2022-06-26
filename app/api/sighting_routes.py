from flask import Blueprint, session, request
from sqlalchemy import desc
from app.forms import SightingForm
from app.models import Sighting, SightingImage, Like, User, db
from app.s3_helpers import (
    upload_file_to_s3, allowed_file, get_unique_filename)

sighting_routes = Blueprint("sightings", __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages



@sighting_routes.route("/")
def get_sightings():
    """
    Get all sightings in DB, will use on splash page.
    """
    sightings = Sighting.query.order_by(desc(Sighting.created_at)).all()

    return {"sightings": [sighting.to_dict() for sighting in sightings]}

@sighting_routes.route("/additional")
def get_next_sightings():
    """
    Get next 10 records
    """
    sightings = Sighting.query.order_by(Sighting.created_at).filter(Sighting.id > 10).limit(3).all()


    return {"sightings" : [sighting.to_dict() for sighting in sightings]}


@sighting_routes.route("/<string:category>")
def get_sightings_by_category(category):
    """
    Get all sightings in based of category, will use in category comp.
    """
    sightings = Sighting.query.order_by(Sighting.created_at.desc()).filter(Sighting.category == category).all()

    return {"sightings": [sighting.to_dict() for sighting in sightings]}


@sighting_routes.route("/user/<int:userId>")
def get_sightings_for_user(userId):
    """
    Get all sightings for a user.
    """
    sightings = Sighting.query.filter(Sighting.user_id == userId).all()

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
            # date=request.json["date"],
            # location=request.json["location"],
            title=request.json["title"],
            description=request.json["description"],
            category=request.json["category"],
            image_url=request.json["image_url"]
        )
        db.session.add(sighting)
        db.session.commit()
        return sighting.to_dict()
    return {"errors": validation_errors_to_error_messages(form.errors)}, 400


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
            # Will use this after capstone, need more time
            # date=request.json["date"],
            # location=request.json["location"],
            title=request.json["title"],
            description=request.json["description"],
            category=request.json["category"],
            image_url=request.json["image_url"]
        )

        db.session.add(updated_sighting)
        db.session.commit()

        return sighting.to_dict()
    return {"errors": validation_errors_to_error_messages(form.errors)}, 400


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
@sighting_routes.route("/image", methods=["POST"])
# @login_required
def upload_image():
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
        return upload, 400

    url = upload["url"]
    # flask_login allows us to get the current user from the request
    # new_image = SightingImage(image_url=url)
    # db.session.add(new_image)
    # db.session.commit()
    return {"url": url}


# TESTING SEARCH

@sighting_routes.route('/search/<string:searchstr>')
def searching_sightings(searchstr, methods=["GET", "POST"]):
  # search_results = Sighting.query.filter(Sighting.title.contains(searchstr)) \
  # .filter(Sighting.category.contains(searchstr))

  search_results = Sighting.query.filter(
    or_(Sighting.title.contains(searchstr), Sighting.category.contains(searchstr), Sighting.description.contains(searchstr)))

  results = { "sightings": [ search.to_dict() for search in  search_results]}
  if len(results['sightings']) > 0:
    return results
  else :
    return {"error": "No results found."}

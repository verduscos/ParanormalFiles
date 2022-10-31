import re
import sqlalchemy
from flask import Blueprint, session, request
from sqlalchemy import desc, asc, or_, func
from app.forms import SightingForm
from app.models import Sighting, SightingImage, User, db, Tag, SightingTag
# likes
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
    Get latest 10 records
    """
    sightings = Sighting.query \
      .order_by(Sighting.id.desc()) \
      .limit(10)

    return {"sightings": [sighting.to_dict() for sighting in sightings]}


@sighting_routes.route("/additional/<string:id>")
def get_next_sightings(id):
    """
    Get next 10 latest records
    """
    sightings = Sighting.query \
      .order_by(Sighting.id.desc()) \
      .filter(Sighting.id < id) \
      .limit(10)

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
    return {"sighting": sighting.to_dict() }


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
            title=request.json["title"],
            description=request.json["description"],
            category=request.json["category"],
            image_url=request.json["image_url"],
        )
        tag_ids = []
        db.session.add(sighting)
        db.session.commit()
        for tag in request.json["tags"]:
          tag_res = Tag.query.filter(Tag.title == tag).first()
          if tag_res:
              tag_ids.append(tag_res.id)
          else:
              new_tag = Tag(title=tag)
              db.session.add(new_tag)
              db.session.commit()
              tag_id = Tag.query.filter(Tag.title == tag).first()
              tag_ids.append(tag_id.id)
        for id in tag_ids:
          test = SightingTag(
            sighting_id=sighting.id,
            tag_id=id
          )
          db.session.add(test)
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
    return {"errors": "Sighting not found."}, 400


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


@sighting_routes.route('/search/<string:searchstr>')
def searching_sightings(searchstr, methods=["GET", "POST"]):
  search_results = Sighting.query.filter(
    or_(
      func.lower(Sighting.title).contains(func.lower(searchstr)),
      func.lower(Sighting.category).contains(func.lower(searchstr)),
      func.lower(Sighting.description).contains(func.lower(searchstr))
      )
    ).all()

  results = { "sightings": [ search.to_dict() for search in  search_results]}
  if len(results['sightings']) > 0:
    return results
  else :
    return {"error": "No results found."}

from flask import Blueprint, session, request
from app.forms import BookmarkForm
from app.models import Bookmark, User, db

bookmark_routes = Blueprint("bookmarks", __name__)


@bookmark_routes.route("/<int:userId>")
def get_bookmarks(userId):
  """
  Get all user favorites.
  """
  bookmarks = Bookmark.query.filter(Bookmark.user_id == userId).all()

  return {"bookmarks": [bookmark.to_dict() for bookmark in bookmarks]}

@bookmark_routes.route("/", methods=["POST"])
def post_bookmark():
  """
  Post a bookmark to a specific sighting.
  """
  form = BookmarkForm()
  form["csrf_token"].data = request.cookies["csrf_token"]
  if form.validate_on_submit():
    searchExists = Bookmark.query.filter(Bookmark.user_id == request.json["user_id"], Bookmark.sighting_id == request.json["sighting_id"]).first()
    if searchExists is None:
      bookmark = Bookmark(
        user_id=request.json["user_id"],
        sighting_id=request.json["sighting_id"]
      )
      db.session.add(bookmark)
      db.session.commit()

      return { "bookmarks" : bookmark.to_dict() }

  return { "bookmarks" : "post to bookmarks failed." }


@bookmark_routes.route("/", methods=["DELETE"])
def delete_bookmark():
  """
  Delete a bookmark for a specific sighting.
  """
  form = Bookmark()
  # form["csrf_token"].data = request.cookies["csrf_token"]
  # if form.validate_on_submit():
  searchExists = Bookmark.query.filter(Bookmark.user_id == request.json["user_id"], Bookmark.sighting_id == request.json["sighting_id"]).first()
  if searchExists is not None:
    db.session.delete(searchExists)
    db.session.commit()
    return { "deleted" : searchExists.sighting_id }

  return { "bookmarks" : "bookmark delete failed." }

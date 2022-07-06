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
  # total_likes = len(likes)

  return {"bookmarks": [bookmark.to_dict() for bookmark in bookmarks]}


# @like_routes.route("/", methods=["POST"])
# def post_like():
#   """
#   Post a like to a specific sighting.
#   """
#   form = LikeForm()
#   form["csrf_token"].data = request.cookies["csrf_token"]
#   if form.validate_on_submit():
#     searchExists = Like.query.filter(Like.user_id == request.json["user_id"], Like.sighting_id == request.json["sighting_id"]).first()
#     if searchExists is None:
#       like = Like(
#         user_id=request.json["user_id"],
#         sighting_id=request.json["sighting_id"]
#       )
#       db.session.add(like)
#       db.session.commit()

#       return { "likes" : like.to_dict() }

#   return { "likes" : "post to likes failed." }


# @like_routes.route("/", methods=["DELETE"])
# def delete_like():
#   """
#   Delete a like for a specific sighting.
#   """
#   form = LikeForm()
#   # form["csrf_token"].data = request.cookies["csrf_token"]
#   # if form.validate_on_submit():
#   searchExists = Like.query.filter(Like.user_id == request.json["user_id"], Like.sighting_id == request.json["sighting_id"]).first()
#   if searchExists is not None:
#     db.session.delete(searchExists)
#     db.session.commit()
#     return { "deleted" : searchExists.sighting_id }

#   return { "likes" : "delete to likes failed." }

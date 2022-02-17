from flask import Blueprint, session, request
from app.forms import CommentForm
from app.models import Comment, db

comment_routes = Blueprint("comments", __name__)


@comment_routes.route("/<int:sightingId>", methods=["POST"])
def create_comment(sightingId):
    """
    Create a comment for a specific sighting.
    """
    form = CommentForm()
    print("SOMETHINGGGGGGG")
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        comment = Comment(
            user_id=request.json["user_id"],
            sighting_id=sightingId,
            comment=request.json["comment"]
        )
        db.session.add(comment)
        db.session.commit()

        return {"comment": comment.to_dict()}
    return {"errors": form.errors}, 400


@comment_routes.route("/<int:sightingId>")
def get_comments(sightingId):
    """
    Get all comments for a specific sighting.
    """
    comments = Comment.query.filter(Comment.sighting_id == sightingId).all()

    return {"comments": [comment.to_dict() for comment in comments]}

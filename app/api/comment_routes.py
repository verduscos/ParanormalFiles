from flask import Blueprint, session, request
from app.forms import CommentForm
from app.models import Comment, db

comment_routes = Blueprint("comments", __name__)


@comment_routes.route("/<int:sightingId>")
def get_comments(sightingId):
    """
    Get all comments for a specific sighting.
    """
    comments = Comment.query.filter(Comment.sighting_id == sightingId).all()

    return {"comments": [comment.to_dict() for comment in comments]}

from flask import Blueprint, session, request
from app.forms import CommentForm
from app.models import Comment, User, db

comment_routes = Blueprint("comments", __name__)


@comment_routes.route("/<int:sightingId>", methods=["POST"])
def create_comment(sightingId):
    """
    Create a comment for a specific sighting.
    """
    form = CommentForm()
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
    comments = Comment.query.order_by(Comment.updated_at.desc()).join(User).filter(
        Comment.sighting_id == sightingId
    ).all()
    # comments = Comment.query.filter(Comment.sighting_id == sightingId).all()

    return {"comments": [comment.to_dict() for comment in comments]}


@comment_routes.route("/<int:commentId>", methods=["PUT"])
def update_comment(commentId):
    """
    Update a specific comment.
    """
    form = CommentForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    comment = Comment.query.get(commentId)

    if form.validate_on_submit():
        comment.comment = request.json["comment"]
        db.session.commit()
        return {"comment": comment.to_dict()}
    return{"update": "success"}



@comment_routes.route("<int:commentId>", methods=["DELETE"])
def delete_comment(commentId):
    """
    Delete a specific comment.
    """
    comment = Comment.query.get(commentId)

    if comment:

        db.session.delete(comment)
        db.session.commit()

        print("WE DELETED")
        print(type(commentId))
        return {"delete": f"{commentId}"}
    print("WE DID NOT")
    return {errors: "Sighting not found."}, 400

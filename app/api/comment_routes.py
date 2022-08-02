from flask import Blueprint, session, request
from app.forms import CommentForm
from app.models import Comment, User, db

comment_routes = Blueprint("comments", __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


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
    return {"errors": validation_errors_to_error_messages(form.errors)}, 400


@comment_routes.route("/<int:sightingId>")
def get_comments(sightingId):
    """
    Get all comments for a specific sighting.
    """
    comments = Comment.query \
    .order_by(Comment.created_at) \
    .join(User).filter(
        Comment.sighting_id == sightingId
    ).all()

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
    return{"errors": validation_errors_to_error_messages(form.errors)}, 400


@comment_routes.route("<int:commentId>", methods=["DELETE"])
def delete_comment(commentId):
    """
    Delete a specific comment.
    """
    comment = Comment.query.get(commentId)

    if comment:

        db.session.delete(comment)
        db.session.commit()

        return {"delete": f"{commentId}"}
    return {errors: "Sighting not found."}, 400

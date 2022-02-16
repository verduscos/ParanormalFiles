import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import * as sessionActions from "../../store/sighting"


const SingleSighting = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const params = useParams()
    const { sightingId } = params
    let sighting = useSelector(state => state.sightings["singleSighting"])
    let currentUser = useSelector(state => state.session.user)

    const handleDelete = (e) => {
        e.preventDefault();
        dispatch(sessionActions.deleteASighting(sightingId))

        history.push("/")
    }


    useEffect(() => {
        dispatch(sessionActions.getASighting(sightingId))
    }, [dispatch, sightingId])

    return (
        <>
        { currentUser && currentUser?.id === sighting?.user_id ?
        <button onClick={handleDelete}>Delete</button> :
        null
        }

        <h1>{sighting?.title}</h1>
        <p>{sighting?.date}</p>
        <p>{sighting?.category}</p>
        <p>{sighting?.description}</p>
        </>
    )
}


export default SingleSighting;

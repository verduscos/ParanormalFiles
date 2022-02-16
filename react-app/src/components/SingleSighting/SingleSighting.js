import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import * as sessionActions from "../../store/sighting"


const SingleSighting = () => {
    const dispatch = useDispatch()
    const params = useParams()
    const { sightingId } = params
    let sighting = useSelector(state => state.sightings["singleSighting"])


    useEffect(() => {
        dispatch(sessionActions.getASighting(sightingId))
    }, [dispatch, sightingId])

    return (
        <>
        <h1>{sighting?.title}</h1>
        <p>{sighting?.date}</p>
        <p>{sighting?.category}</p>
        <p>{sighting?.description}</p>
        </>
    )
}


export default SingleSighting;

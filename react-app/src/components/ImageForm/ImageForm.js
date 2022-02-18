import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import * as sessionActions from "../../store/sighting"

const ImageForm = () => {
  let currentUser = useSelector(state => state.session.user)
  const params = useParams();

  const { sightingId } = params;

  console.log(sightingId)

  let test = useSelector(state => state.sightings)

  let testarr = Object.keys(test)
  // let newId = parseInt(testarr[testarr.length - 1])
  // newId++
  // console.log(newId)

  const history = useHistory()
  const dispatch = useDispatch()
  const [date, setDate] = useState("")
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")



console.log("TEST HRE", test)

useEffect(() => {
  dispatch(sessionActions.getAllSightings())
}, [dispatch])


  // TEST



  const [image, setImage] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);


  const handleSubmit = async (e) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append("image", image);


      // aws uploads can be a bit slow—displaying
      // some sort of loading message is a good idea
      setImageLoading(true);

      const res = await fetch(`/api/sightings/${sightingId}/image`, {
          method: "POST",
          body: formData,
      });
      if (res.ok) {
          await res.json();
          setImageLoading(false);
          history.push("/images");
      }
      else {
          setImageLoading(false);
          setImageLoading(false);
          const data = await res.json();
          // a real app would probably use more advanced
          // error handling
          console.log(data);
      }
  }

  const updateImage = (e) => {
      const file = e.target.files[0];
      setImage(file);
  }



  // TEST

  // const createSighting = (e) => {
  //   e.preventDefault()

  //   const payload = {
  //     user_id: currentUser.id,
  //     date: date,
  //     location: "testing",
  //     title: title,
  //     description: description,
  //     category: category
  //   }
  //   console.log('SAKLFJDSKL')

  //   dispatch(sessionActions.createASighting(payload)).catch(async (res) => {
  //     const data = await res.json();
  //     console.log("THIS IS THE DATA", data)

  //   })
  //   history.push(`/sightings/${newId}/images`)
  // }


  return (
    <>
      {/* <form onSubmit={createSighting} id="sighting-form">
        <input
          onChange={(e) => {
            setDate(e.target.value)
          }}
          type="date" value={date} />
        <input
          onChange={(e) => {
            setTitle(e.target.value)
          }}
          type="text" value={title} placeholder="Title" />
        <textarea
          onChange={(e) => {
            setDescription(e.target.value)
          }}
          type="text" value={description} placeholder="description" />
        <select
          onChange={(e) => {
            setCategory(e.target.value)
          }}
          value={category}>
          <option value="categories">Select Category</option>
          <option value="UFOs">UFOs</option>
          <option value="Ghosts">Ghosts</option>
          <option value="Demons">Demons</option>
        </select>
        <button>Report</button>
      </form> */}

      {/* TESING */}
      <h1>TEST IMAGE</h1>
      <form onSubmit={handleSubmit}>
            <input
              type="file"
              accept="image/*"
              onChange={updateImage}
            />
            <button type="submit">Submit</button>
            {(imageLoading)&& <p>Loading...</p>}
        </form>
    </>
  )
}


export default ImageForm;

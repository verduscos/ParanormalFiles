import { AiOutlineClose } from 'react-icons/ai';
import { TiDeleteOutline } from "react-icons/ti";


const Tags = (props) => {
  const regex = /^[a-z]+(\s[a-z]+)?$/i

  return (
    <div id="form-category-image-container">
      <div id="form-category-image-container-inner">
        {props.errors?.map(error => <li className="error-mssg">{error}</li>)}
        <p id="tag-header">Publishing to: <b>{props.currentUser.username}</b></p>
        <p>Add some tags (up to 5) so readers know what your story is about</p>
        <AiOutlineClose
          id="tag-modal-exit"
          onClick={() => props.setDisplayTagModal(false)}
        />

        <input
          className="tags-input"
          type="text"
          placeholder="Add a tag..."
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              if (regex.test(e.target.value) && !props.tags.includes(e.target.value) && props.tags.length < 5) {
                props.setTags(current => [...current, e.target.value]);
              }
            }
          }}
          onKeyUp={(e) => {
            if (e.key === "Enter") e.target.value = "";
          }}
        />

        <p id="tag-instruc"><i>Press enter to add tag.</i></p>

        <ul id="tag-container">
          {props.tags.map((tag, index) => (
            <div className="categories-list-item tag-item" key={index}>
              <li className="tag-title">{tag}</li>
              <TiDeleteOutline
                className="tag-item-delete"
                onClick={() => {
                  props.tags.splice(index, 1)
                  props.setTags(current => [...current])
                }}
              />
            </div>
          ))}
        </ul>

        <button
          id="submit-btn"
          className="form-submit-btn sighting-inputs"
          onClick={(e) => props.createSighting(e)} >
          Publish now
        </button>
      </div>
    </div>
  )
}

export default Tags;

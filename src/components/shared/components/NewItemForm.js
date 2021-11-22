import React, { useState } from "react";
import uploadImg from "../../../services/uploadImg";
import { useSelector, useDispatch } from "react-redux";
import { addPlayer } from "../../../redux/players/player-action";

export default function NewItemForm({ handleOnChange, handleShowNewItemForm }) {
  const dispatch = useDispatch();
  const [isShowNewItemForm, setIsShowNewItemForm] = useState(false);
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");

  let { player, departments } = useSelector(state => state.playerReducer);

  const showNewItemForm = () => {
    setIsShowNewItemForm(!isShowNewItemForm);
  };

  const handleImageSelect = event => {
    const file = document.getElementById("imgInput").files[0];
    console.log(file);
    const reader = new FileReader();
    reader.onload = function(e) {
      let displayImage = document.createElement("img");
      displayImage.src = e.target.result;
      console.log(e.target.result);
      setImagePreview(displayImage);
    };
    reader.readAsDataURL(file);

    setImage(event.target.files[0]);
  };

  const onSubmit = event => {
    event.preventDefault();

    image ? createNewPlayer() : alert("Please upload an image");

  };

  const createNewPlayer = () => {
    
    image && uploadImg(player.username, image);
    
    dispatch(addPlayer(player));
    setIsShowNewItemForm(!isShowNewItemForm);
    setImage(false);
    setImagePreview(false);
  }

  return (
    <>
      <section className="d-flex flex-row justify-content-start">
        <button
          onClick={showNewItemForm}
          type="button"
          className="btn btn-outline-success mx-1"
        >
          <span className="fas fa-plus  mr-2 my-lg-0" /> Add New Player
        </button>
        {isShowNewItemForm && (
          <button
            onClick={handleShowNewItemForm}
            type="button"
            className="btn btn-outline-warning mx-1"
          >
            <span className="fas fa-chevron-left  mr-2 my-lg-0" /> Cancel
          </button>
        )}
      </section>
      {isShowNewItemForm && (
        <div className="card my-3" style={{ width: "auto" }}>
          <form className="card-header" id="newPlayer" onSubmit={onSubmit}>
            <section className="d-flex flex-row">
              <div className="mt-3 mr-3 input-width">
                <label htmlFor="firstName">Username</label>
                <input
                  name="username"
                  id="username"
                  required="required"
                  type="text"
                  onChange={handleOnChange}
                  className="form-control"
                />
              </div>
            </section>
            <section className="d-flex flex-row">
              <div className="mt-3 mr-3 input-width">
                <label htmlFor="department" className="mt-3">
                  Department
                </label>
                
                <select name="department"
                  id="department"
                  type="text"
                  onChange={handleOnChange}
                  className="form-control">
                    <option value="">Select Department</option>
      {departments.map(d => (<option value={d}>{d}</option>))}
                    
                  </select>
              </div>
              
            </section>


            <h4>Upload Image</h4>
            <input type="file" id="imgInput" onChange={handleImageSelect} />

            {imagePreview && <img src={imagePreview.src} alt="" />}

            <button type="submit" className="btn btn-success mt-3">
              <span className="fas fa-save mr-2" />
              Save
            </button>
          </form>
        </div>
      )}
    </>
  );
}

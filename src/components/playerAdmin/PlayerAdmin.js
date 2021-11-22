import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  fetchPlayers,
  updatePlayer,
  addPlayer,
  removePlayer,
  setPlayer
} from "../../redux/players/player-action";
import NewItemForm from "../shared/components/NewItemForm";

export default function PlayerAdmin() {
  //redux
  const dispatch = useDispatch();
  let { players, player, isLoading } = useSelector(
    state => state.playerReducer
  );

  const [isShowNewItemForm, setIsShowNewItemForm] = useState(false);
  useEffect(() => {
    dispatch(fetchPlayers());
  }, []);

  const showNewItemForm = () => {
    setIsShowNewItemForm(!isShowNewItemForm);
  };

  const onChange = ({ currentTarget: input }) => {
    const newPlayer = { ...player };
    const { name, value } = input;
    newPlayer[name] = value;
    dispatch(setPlayer(newPlayer));
  };

  const onSubmit = event => {
    event.preventDefault();
    dispatch(addPlayer(player));

    setIsShowNewItemForm(!isShowNewItemForm);
  };

  const removeItem = (id, name) => {
    const isConfirmed = window.confirm(`Delete ${name}?`);
    if (!isConfirmed) return;
    dispatch(removePlayer(id));
  };

  return (
    <>
      <NewItemForm
        isShowNewItemForm={isShowNewItemForm}
        handleOnChange={onChange}
        handleOnSubmit={onSubmit}
        handleShowNewItemForm={showNewItemForm}
      />

      {isLoading ? (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center"
          }}
        >
          <div
            className="spinner-border"
            style={{
              width: "9rem",
              height: "9rem",
              color: "purple"
            }}
            role="status"
          >
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        players.map(item => (
          <div key={item._id} className="card mt-3" style={{ width: "auto" }}>
            <div className="card-header">
              <h3 className="card-title">{item.username}</h3>
            </div>
            <section className="card-body">
              <div className="row">
                <Link
                  to={`/edit-hero/${item._id}`}
                  className="btn btn-primary card-link col text-center"
                >
                  <span className="fas fa-edit  mr-2" />
                  Edit
                </Link>
                <button
                  onClick={() => removeItem(item._id, item.username)}
                  className="btn btn-outline-danger card-link col text-center"
                >
                  <span className="fas fa-eraser  mr-2" />
                  Delete
                </button>
              </div>
            </section>
          </div>
        ))
      )}
    </>
  );
}

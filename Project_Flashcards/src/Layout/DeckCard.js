import React from "react";
import { useHistory } from "react-router-dom";
import { deleteDeck } from "../utils/api";

const DeckCard = (props) => {
  const { id, name, description, cards } = props;
  const history = useHistory();

  const onDelete = async (deleteId) => {
    if (!window.confirm("Delete this deck?")) return;
    console.log(await deleteDeck(deleteId));
    history.go(0);
  };
  return (
    <div className="card mb-2">
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
	<small className="text-muted">{cards.length} cards</small>
        <p className="card-text">{description}</p>
        <div className="d-flex justify-content-between">
          <div>
            <button
              className="btn btn-secondary mr-2"
              onClick={() => history.push(`/decks/${id}`)}
            >
              View
            </button>
            <button
              className="btn btn-primary"
              onClick={() => history.push(`/decks/${id}/study`)}
            >
              Study
            </button>
          </div>
          <div>
            <button className="btn btn-danger" onClick={() => onDelete(id)}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeckCard;

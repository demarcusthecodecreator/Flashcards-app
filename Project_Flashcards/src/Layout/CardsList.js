import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { act } from "react-dom/test-utils";
import { listDecks } from "../utils/api";
import DeckCard from "./DeckCard";

const fetchDecksList = () => {
  return listDecks()
    .then((decks) => decks)
    .catch((err) => console.error(err));
};

const CardList = () => {
  //Shows a list of decks with options to create, study, view, or delete a deck
  const [decks, setDecks] = useState();
  const history = useHistory();

  useEffect(() => {
    fetchDecksList().then((decks) => {
      act(() => {
        setDecks(decks);
      });
    });
  }, []);

  const handleNavigate = () => {
    history.push("/decks/new");
  };

  if (!decks) return "Loading...";
  return (
    <div className="container">
      <button className="btn btn-secondary mb-2" onClick={handleNavigate}>
        Create new
      </button>
      {decks.map((deck) => (
        <DeckCard key={deck.id} {...deck} />
      ))}
    </div>
  );
};

export default CardList;

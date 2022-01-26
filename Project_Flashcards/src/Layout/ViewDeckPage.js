import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { deleteCard, deleteDeck, readDeck } from "../utils/api";
import AppBreadcrumb from "./AppBreadcrumb";

const ViewDeckPage = () => {
  const { deckId } = useParams();
  const [deckInfo, setDeckInfo] = useState(null);
  const history = useHistory();

  useEffect(() => {
    async function getDeckInfo() {
      try {
        const _deckInfo = await readDeck(deckId);
        setDeckInfo(_deckInfo);
      } catch (error) {
        console.log(error);
      }
    }
    getDeckInfo();
  }, [deckId]);

  const handleNavigateStudy = useCallback(
    () => history.push(`/decks/${deckId}/study`),
    [deckId, history]
  );

  const handleNavigateEdit = useCallback(
    () => history.push(`/decks/${deckId}/edit`),
    [deckId, history]
  );

  const handleNavigateAddCard = useCallback(
    () => history.push(`/decks/${deckId}/cards/new`),
    [deckId, history]
  );

  const handleDeleteDeck = useCallback(async () => {
    const userConfirmed = window.confirm("Delete this Deck?");
    try {
      if (userConfirmed) {
        await deleteDeck(deckId);
        history.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  }, [deckId, history]);

  const handleDeleteCard = useCallback(async (cardId) => {
    const userConfirmed = window.confirm("Delete this card?");
    if (userConfirmed) {
      await deleteCard(cardId);
      setDeckInfo((prev) => ({
        ...prev,
        cards: prev.cards.filter((card) => card.id !== cardId),
      }));
    }
  }, []);

  const handleEditCard = useCallback(
    (cardId) => history.push(`/decks/${deckId}/cards/${cardId}/edit`),
    [deckId, history]
  );

  if (!deckInfo) return <div className="container">Loading...</div>;

  const breadcrumbItems = [
    { title: "Home", link: "/" },
    { title: `${deckInfo.name}`, link: "#" },
  ];

  return (
    <>
      <div className="container">
        <AppBreadcrumb breadcrumbItems={breadcrumbItems} />
        <h3>{deckInfo.name}</h3>
        <p>{deckInfo.description}</p>
        <div className="d-flex justify-content-between">
          <div>
            <button
              className="btn btn-secondary mr-2"
              onClick={handleNavigateEdit}
            >
              Edit
            </button>
            <button
              className="btn btn-primary mr-2"
              onClick={handleNavigateStudy}
            >
              Study
            </button>
            <button className="btn btn-primary" onClick={handleNavigateAddCard}>
              Add Cards
            </button>
          </div>
          <button className="btn btn-danger" onClick={handleDeleteDeck}>
            Delete
          </button>
        </div>
      </div>

      {deckInfo.cards.length > 0 ? (
        <div className="container mt-5">
          <h3>Cards</h3>
          {deckInfo.cards.map((card, index) => (
            <div className="card mb-2" key={index}>
              <div className="card-body">
                <div className="row">
                  <p className="col">{card.front}</p>
                  <p className="col">{card.back}</p>
                </div>
                <div className="d-flex justify-content-end">
                  <button
                    className="btn btn-secondary mr-2"
                    onClick={() => handleEditCard(card.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDeleteCard(card.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="container mt-5">
          <div className="alert alert-primary" role="alert">
            <h5>No cards in this deck.</h5>
          </div>
        </div>
      )}
    </>
  );
};

export default ViewDeckPage;

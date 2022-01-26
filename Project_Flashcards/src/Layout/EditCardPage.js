import React, { useState, useEffect, useCallback } from "react";
import { useHistory, useParams } from "react-router-dom";
import CardForm from "../components/CardForm";
import { readCard, readDeck, updateCard } from "../utils/api";
import AppBreadcrumb from "./AppBreadcrumb";

const EditCardPage = () => {
  const { deckId, cardId } = useParams();
  const [deckInfo, setDeckInfo] = useState(null);
  const [cardInfo, setCardInfo] = useState({ front: "", back: "" });
  const history = useHistory();

  useEffect(() => {
    async function getDeckAndCardInfo() {
      try {
        const _deckInfo = await readDeck(deckId);
        setDeckInfo(_deckInfo);

        const _cardInfo = await readCard(cardId);
        setCardInfo(_cardInfo);
      } catch (error) {
        console.log(error);
      }
    }

    getDeckAndCardInfo();
  }, [cardId, deckId]);

  const handleSubmit = useCallback(
    async (dataToSubmit) => {
      try {
        await updateCard(dataToSubmit);
        setCardInfo({ front: "", back: "" });
        history.push(`/decks/${deckId}`);
      } catch (error) {
        console.log(error);
      }
    },
    [deckId, history]
  );

  const handleCancel = useCallback(
    () => history.push(`/decks/${deckId}`),
    [deckId, history]
  );

  if (!deckInfo) return <div className="container">Loading...</div>;

  const breadcrumbItems = [
    { title: "Home", link: "/" },
    { title: `${deckInfo.name}`, link: "#" },
    { title: "Add Card", link: "#" },
  ];

  return (
    <div className="container">
      <AppBreadcrumb breadcrumbItems={breadcrumbItems} />
      <h1>Edit Card</h1>
      <CardForm
        front={cardInfo.front}
        back={cardInfo.back}
        handleSubmit={handleSubmit}
        handleCancel={handleCancel}
      />
    </div>
  );
};

export default EditCardPage;

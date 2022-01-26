import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import CardForm from "../components/CardForm";
import { createCard, readDeck } from "../utils/api";
import AppBreadcrumb from "./AppBreadcrumb";

const AddCardPage = () => {
  const { deckId } = useParams();
  const [deckInfo, setDeckInfo] = useState(null);
  const [cardInfo, setCardInfo] = useState({ front: "", back: "" });
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

  const handleDone = useCallback(
    () => history.push(`/decks/${deckId}`),
    [deckId, history]
  );

  const handleSave = useCallback(
    async (dataToSubmit) => {
      try {
        await createCard(deckId, dataToSubmit);
        setCardInfo({ front: "", back: "" });
      } catch (error) {
        console.log(error);
      }
    },
    [deckId]
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
      <h1>{deckInfo.name}: Add Card</h1>
      <CardForm
        handleSubmit={handleSave}
        front={cardInfo.front}
        back={cardInfo.back}
        handleDone={handleDone}
      />
    </div>
  );
};

export default AddCardPage;

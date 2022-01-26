import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { readDeck } from "../utils/api";
import AppBreadcrumb from "./AppBreadcrumb";
import Card from "./Card";

const StudyDeckPage = () => {
  const { deckId } = useParams();
  const history = useHistory();
  const [deckInfo, setDeckInfo] = useState(null);
  const [currentCardNumber, setCurrentCardNumber] = useState(null);

  const handleNext = () => {
    if (currentCardNumber === deckInfo.cards.length) {
      const userConfirmed = window.confirm("Restart cards?");
      if (!userConfirmed) {
        history.push("/");
      } else {
        setCurrentCardNumber(1);
      }
    } else {
      setCurrentCardNumber((prev) => prev + 1);
    }
  };

  useEffect(() => {
    async function getDeckInfo() {
      try {
        const _deckInfo = await readDeck(deckId);
        if (_deckInfo.cards.length >= 3) {
          setCurrentCardNumber(1);
        }
        setDeckInfo(_deckInfo);
      } catch (error) {
        console.log(error);
      }
    }
    getDeckInfo();
  }, [deckId]);

  if (!deckInfo) return <div className="container">Loading...</div>;

  const breadcrumbItems = [
    { title: "Home", link: "/" },
    { title: `${deckInfo.name}`, link: "#" },
    { title: "Study", link: "#" },
  ];

  return (
    <div className="container">
      <AppBreadcrumb breadcrumbItems={breadcrumbItems} />
      <h1>Study: {deckInfo.name}</h1>
      <p>{deckInfo.description}</p>
      {currentCardNumber !== null ? (
        <Card
          currentCardNumber={currentCardNumber}
          cardCount={deckInfo.cards.length}
          cardInfo={deckInfo.cards[currentCardNumber - 1]}
          onClickNext={handleNext}
        />
      ) : (
        <div className="alert alert-primary" role="alert">
          <h5>Not enough cards.</h5>
          <p>
            You atleast need 3 cards in the deck. There are{" "}
            {deckInfo.cards.length} cards in this deck.
          </p>
        </div>
      )}
    </div>
  );
};

export default StudyDeckPage;

import React, { useCallback, useState } from "react";

const CardSides = {
  front: "front",
  back: "back",
};

const Card = ({ currentCardNumber, cardCount, cardInfo, onClickNext }) => {
  const [currentCardSide, setCurrentCardSide] = useState(CardSides.front);

  const handleFlip = useCallback(
    () =>
      setCurrentCardSide((current) =>
        current === CardSides.back ? CardSides.front : CardSides.back
      ),
    [setCurrentCardSide]
  );

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">
          Card {currentCardNumber} of {cardCount}
        </h5>
        <p className="card-text">{cardInfo[currentCardSide]}</p>
        <div className="d-flex justify-content-between">
          <div>
            <button className="btn btn-secondary mr-2" onClick={handleFlip}>
              Flip
            </button>
            {currentCardSide === CardSides.back ? (
              <button
                className="btn btn-primary"
                onClick={() => {
                  setCurrentCardSide(CardSides.front);
                  onClickNext();
                }}
              >
                Next
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;

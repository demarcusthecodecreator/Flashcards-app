import React, { useCallback, useState } from "react";

const CardForm = ({
  front = "",
  back = "",
  handleSubmit,
  handleDone = null,
  handleCancel = null,
}) => {
  const [cardData, setCardData] = useState({ front, back });

  const handleChange = useCallback(
    ({ target: { name, value } }) =>
      setCardData((currentCardData) => ({ ...currentCardData, [name]: value })),
    []
  );

  const handleSubmitWrapper = useCallback(
    (e) => {
      e.preventDefault();
      handleSubmit(cardData);
    },
    [cardData, handleSubmit]
  );

  return (
    <form onSubmit={handleSubmitWrapper}>
      <div className="form-group">
        <label htmlFor="front">Front</label>
        <textarea
          className="form-control"
          id="front"
          rows="3"
          placeholder="Front side of card"
          required
          name="front"
          value={cardData.front}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="front">Back</label>
        <textarea
          className="form-control"
          id="back"
          rows="3"
          placeholder="Back side of card"
          required
          name="back"
          value={cardData.back}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        {handleDone ? (
          <button className="btn btn-secondary mr-2" onClick={handleDone}>
            Done
          </button>
        ) : null}
        {handleCancel ? (
          <button className="btn btn-secondary mr-2" onClick={handleCancel}>
            Cancel
          </button>
        ) : null}
        <button className="btn btn-primary" type="submit">
          Save
        </button>
      </div>
    </form>
  );
};

export default CardForm;

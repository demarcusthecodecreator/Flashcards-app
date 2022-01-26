import React, { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import { createDeck } from "../utils/api";
import AppBreadcrumb from "./AppBreadcrumb";

const CreateNewDeckPage = () => {
  const [deckInfo, setDeckInfo] = useState({ name: "", description: "" });
  const history = useHistory();
  const breadcrumbItems = [
    { title: "Home", link: "/" },
    { title: "Create Deck", link: "#" },
  ];

  const handleChange = useCallback(
    ({ target }) =>
      setDeckInfo((_deckInfo) => ({
        ..._deckInfo,
        [target.name]: target.value,
      })),
    [setDeckInfo]
  );

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();

      try {
        const response = await createDeck(deckInfo);
        setDeckInfo({ name: "", description: "" });
        history.push(`/decks/${response.id}`);
      } catch (error) {
        console.log(error);
      }
    },
    [deckInfo, history]
  );

  const handleCancel = useCallback(() => history.push("/"), [history]);

  return (
    <div className="container">
      <AppBreadcrumb breadcrumbItems={breadcrumbItems} />
      <h1>Create Deck</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="deckName">Name</label>
          <input
            type="text"
            className="form-control"
            id="deckName"
            name="name"
            aria-describedby="emailHelp"
            placeholder="Deck Name"
            required
            value={deckInfo.name}
            onChange={handleChange}
          />
          <small id="deckNameRequired" className="form-text text-muted">
            This field is required
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="deckDescription">Description</label>
          <textarea
            className="form-control"
            id="deckDescription"
            name="description"
            placeholder="Brief description of the deck."
            value={deckInfo.description}
            onChange={handleChange}
          />
        </div>
        <button className="btn btn-secondary mr-2" onClick={handleCancel}>
          Cancel
        </button>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateNewDeckPage;

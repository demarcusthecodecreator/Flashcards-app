import React, { useEffect, useState, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { readDeck, updateDeck } from "../utils/api";
import AppBreadcrumb from "./AppBreadcrumb";

const EditDeckPage = () => {
  const { deckId } = useParams();
  const [deckInfo, setDeckInfo] = useState({
    id: deckId,
    name: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const history = useHistory();

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
        await updateDeck(deckInfo);
        history.push(`/decks/${deckId}`);
        // TODO: navigate to ViewDeckPage
      } catch (error) {
        console.log(error);
      }
    },
    [deckInfo, deckId, history]
  );

  const handleCancel = useCallback(
    () => history.push(`/decks/${deckId}`),
    [deckId, history]
  );

  useEffect(() => {
    async function getDeckInfo() {
      setLoading(true);
      try {
        const _deckInfo = await readDeck(deckId);
        setDeckInfo(_deckInfo);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    getDeckInfo();
  }, [deckId]);

  if (loading) return <div className="container">Loading...</div>;

  const breadcrumbItems = [
    { title: "Home", link: "/" },
    { title: `${deckInfo.name}`, link: "#" },
    { title: "Edit Deck", link: "#" },
  ];

  return (
    <div className="container">
      <AppBreadcrumb breadcrumbItems={breadcrumbItems} />
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

export default EditDeckPage;

import React from "react";
import { Route, Switch } from "react-router-dom";
import Layout from "./Layout";
import Header from "./Layout/Header";
import NotFound from "./Layout/NotFound";
import CreateNewDeckPage from "./Layout/CreateNewDeckPage";
import StudyDeckPage from "./Layout/StudyDeckPage";
import ViewDeckPage from "./Layout/ViewDeckPage";
import EditDeckPage from "./Layout/EditDeckPage";
import AddCardPage from "./Layout/AddCardPage";
import EditCardPage from "./Layout/EditCardPage";

/**
 * App is a wrapper for <Layout>, you should not need to change this file.
 */

function App() {
  return (
    <>
      <Header />
      <div className="app-routes">
        <Switch>
          <Route exact path="/">
            <Layout />
          </Route>
          <Route exact path="/decks/:deckId/study">
            <StudyDeckPage />
          </Route>
          <Route exact path="/decks/new">
            <CreateNewDeckPage />
          </Route>
          <Route exact path="/decks/:deckId">
            <ViewDeckPage />
          </Route>
          <Route exact path="/decks/:deckId/edit">
            <EditDeckPage />
          </Route>
          <Route exact path="/decks/:deckId/cards/new">
            <AddCardPage />
          </Route>
          <Route exact path="/decks/:deckId/cards/:cardId/edit">
            <EditCardPage />
          </Route>
          <Route path="/*">
            <NotFound />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default App;

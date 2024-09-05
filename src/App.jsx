import React from "react";
import { EventProvider } from "./context/EventContext";
import Main from "./components/Main";
import ChallengeForm from "./components/ChallengeForm";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ChallengeDetail from "./components/ChallengeDetail";
import EditChallenge from "./components/EditChallenge";

const App = () => {
  return (
    <EventProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="https://main--aiplanethachathon.netlify.app/challengeform" element={<ChallengeForm />} />
          <Route path="/challengedetail" element={<ChallengeDetail />} />
          <Route path="/editchallenge/:id" element={<EditChallenge />} />
        </Routes>
      </BrowserRouter>
    </EventProvider>
  );
};

export default App;

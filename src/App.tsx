import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PersonaList from "./components/PersonaList";
import EditPersona from "./components/EditPersona";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PersonaList />} />
        <Route path="/edit/:id" element={<EditPersona />} />
      </Routes>
    </Router>
  );
};

export default App;

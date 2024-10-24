import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import AboutUs from "./pages/aboutUs";
import Resources from "./pages/resources";
import PYQs from "./pages/pyqs";
import Navbar from "./components/navbar";
import QuestionAnswerPage from "./pages/questions";
import TestPage from "./pages/testPage";
import QuestionForm from "./components/questionForm";
import Layout from "./components/layout";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navbar />} />
        <Route path="/aboutUs" element={<AboutUs />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/pyqs" element={<PYQs />} />
        <Route path="/navbar" element={<Navbar />} />
        <Route path="/questions" element={<QuestionAnswerPage />} />
        <Route path="/questionForm" element={<QuestionForm />} />
        <Route path="/testpage" element={<TestPage />} />
      </Routes>
    </Router>
  );
}

export default App;

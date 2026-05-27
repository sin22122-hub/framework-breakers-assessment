import React from "react";
import { createRoot } from "react-dom/client";
import FrameworkBreakersAssessment from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <FrameworkBreakersAssessment />
  </React.StrictMode>
);

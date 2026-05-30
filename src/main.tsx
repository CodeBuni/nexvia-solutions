import { createRoot } from "react-dom/client";
import { Router } from "wouter";
import App from "./App";
import "./styles/index.css";

createRoot(document.getElementById("root")!).render(
  <Router>
    <App />
  </Router>
);
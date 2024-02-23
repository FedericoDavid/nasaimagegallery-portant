import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

import { FavoritesProvider } from "./context/FavoritesContext.tsx";

import "photoswipe/dist/photoswipe.css";
import "react-toggle/style.css";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <FavoritesProvider>
      <App />
    </FavoritesProvider>
  </React.StrictMode>
);

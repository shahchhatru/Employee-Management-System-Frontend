import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import store from "./store/Store.ts";
import "./index.css";
import { Provider } from "react-redux";
import { Toaster } from "@/components/ui/sonner";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
        <Toaster richColors closeButton />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

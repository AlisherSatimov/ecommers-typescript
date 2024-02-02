import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

//Router
import { BrowserRouter } from "react-router-dom";

//Styles
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

//Axios
import axios from "axios";

axios.defaults.baseURL = "https://ecommerce.main-gate.appx.uz/dev/adminka";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </BrowserRouter>
    <ToastContainer position="top-right" theme="colored" />
  </React.StrictMode>
);

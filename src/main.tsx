import ReactDOM from "react-dom/client";
import App from "./App.tsx";

//React-Query
import { QueryClient, QueryClientProvider } from "react-query";
const queryClient = new QueryClient();

//Styles
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

//Router
import { BrowserRouter } from "react-router-dom";

//Axios
import axios from "axios";
axios.defaults.baseURL = "https://ecommerce.main-gate.appx.uz/dev/adminka";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
    <ToastContainer position="top-right" theme="colored" />
  </BrowserRouter>
);

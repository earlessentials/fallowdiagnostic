import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import DisclaimerPage from "../app/disclaimer/page";
import "../app/globals.css";
import Home from "../app/page";
import PrivacyPage from "../app/privacy/page";
import "./pages.css";

const pathname = window.location.pathname.replace(/\/+$/, "");
const Page = pathname.endsWith("/privacy")
  ? PrivacyPage
  : pathname.endsWith("/disclaimer")
    ? DisclaimerPage
    : Home;

document.documentElement.lang = "id";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Page />
  </StrictMode>,
);

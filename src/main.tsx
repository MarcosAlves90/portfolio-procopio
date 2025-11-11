import "@/theme";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@/index.css";
import App from "@/App.tsx";
import Navbar from "@/components/organism/Navbar.tsx";
import ThemeProvider from "@/contexts/ThemeProvider";
import Footer from "@/components/organism/Footer.tsx";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <Navbar />
        <App />
        <Footer />
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
);

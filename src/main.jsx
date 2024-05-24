import React from "react";
import ReactDOM from "react-dom/client";
import { MantineProvider } from "@mantine/core";
import App from "./App.jsx";
import "./app.css";
import "./shared/styles/pagesLayout.css";
import "./shared/styles/colorVariables.css";
import "./shared/styles/fontClasses.css";
import "@mantine/core/styles.css";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <BrowserRouter>
            <MantineProvider>
                <App />
            </MantineProvider>
        </BrowserRouter>
    </React.StrictMode>
);

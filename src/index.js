import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// Chakra UI setup
import { ChakraProvider } from "@chakra-ui/react";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ChakraProvider>
    <App />
  </ChakraProvider>
);

import React from "react";
import { Box } from "@chakra-ui/react";

// Components
import MessageInputCard from "./components/MessageInputCard";
import MessageList from "./components/MessageList";

// Context Provider
import { MessageContextProvider } from "./contexts/MessageContext";

function App() {
  return (
    <MessageContextProvider>
      <Box w="100%" d="flex" justifyContent={"center"}>
        <Box
          w={["100%", null, null, "80%"]}
          d="flex"
          justifyContent={"space-between"}
          flexDirection={["column", null, null, "row"]}
        >
          <MessageInputCard />
          <MessageList />
        </Box>
      </Box>
    </MessageContextProvider>
  );
}

export default App;

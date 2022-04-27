import React from "react";
import { Box, Text, Image, Divider, Button } from "@chakra-ui/react";

// Context state
import { useMessages } from "../contexts/MessageContext";

const MessageList = () => {
  // Fetching state from message context
  const { messages, setMessages } = useMessages();

  // Function to delete a message
  const handleDelete = (id) => {
    const newMessages = messages.filter((message) => message.id !== id);
    setMessages(newMessages);
  };

  return (
    <Box p={[4, null, null, 0]} w={["100%", null, null, "50%"]}>
      <Box
        height={"fit-content"}
        mx={[0, null, null, 8]}
        mt={[4, null, null, 10]}
        p={[6]}
        border={"2px"}
        borderColor={"gray.100"}
        rounded={10}
      >
        <Box d="flex" flexDirection={"column"}>
          {messages.length === 0 ? (
            <Text fontSize={"xl"} color={"gray.300"}>
              No messages posted yet
            </Text>
          ) : (
            messages.map((message) => (
              <Box key={message.id}>
                <Box d="flex" justifyContent={"space-between"}>
                  <Text
                    fontSize={"2xl"}
                    fontWeight={"medium"}
                    color={"gray.700"}
                    mb={[2]}
                  >
                    {message.text}
                  </Text>
                  <Button
                    variant={"ghost"}
                    colorScheme={"red"}
                    onClick={() => handleDelete(message.id)}
                  >
                    Delete
                  </Button>
                </Box>
                {message.gif && message.gif.data && (
                  <Image
                    src={message.gif.data.images.original.url}
                    maxWidth={"100%"}
                    maxHeight={"400px"}
                  />
                )}
                <Divider my={[6]} />
              </Box>
            ))
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default MessageList;

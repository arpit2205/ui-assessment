import React, { useState } from "react";
import { Box, Heading, Button, Input, Image, useToast } from "@chakra-ui/react";

// Add a gif component
import AddGIF from "./AddGIF";

// Context state
import { useMessages } from "../contexts/MessageContext";

const MessageInputCard = () => {
  // Fetching state from message context
  const { media, setMessages, messages, setMedia } = useMessages();

  const [msgInput, setMsgInput] = useState("");

  const toast = useToast();

  // Function to post a message
  const handlePost = () => {
    if (msgInput.length === 0) {
      toast({
        title: "Error",
        description: "Please enter a message",
        status: "error",
        duration: 4000,
        isClosable: true,
      });

      return;
    }

    setMessages([
      ...messages,
      {
        id: messages.length + 1,
        text: msgInput,
        gif: media,
      },
    ]);

    toast({
      title: "Success",
      description: "Message posted successfully",
      status: "success",
      duration: 4000,
      isClosable: true,
    });

    setMedia("");
    setMsgInput("");
  };

  const handleClear = () => {
    setMsgInput("");
    setMedia({});
  };

  return (
    <Box p={[4, null, null, 0]} w={["100%", null, null, "50%"]}>
      <Box
        height={"fit-content"}
        mx={[[0, null, null, 8]]}
        mt={[10]}
        p={[6]}
        border={"2px"}
        borderColor={"gray.100"}
        rounded={10}
      >
        <Box>
          <Heading fontSize={"2xl"} color={"gray.700"}>
            Create new post 💫
          </Heading>

          {/* Message input field */}
          <Input
            type={"text"}
            placeholder={"Enter your message here"}
            variant={"unstyled"}
            fontSize={"2xl"}
            my={[6]}
            onChange={(e) => setMsgInput(e.target.value)}
            value={msgInput}
          />

          {/* If a gif is selected, it will be rendered here */}
          {media && media.type === "GIF" && (
            <Box>
              <Image
                src={media.data.images.original.url}
                maxWidth={"100%"}
                maxHeight={"400px"}
              />
            </Box>
          )}

          {/* Add a gif component */}
          <AddGIF />

          {/* Action Buttons */}
          <Box d="flex" justifyContent={"flex-end"} mt={[4]}>
            <Button
              variant={"ghost"}
              colorScheme={"blue"}
              size={"lg"}
              mr={[2]}
              onClick={handleClear}
            >
              Clear
            </Button>
            <Button
              variant={"solid"}
              colorScheme={"blue"}
              size={"lg"}
              onClick={handlePost}
            >
              Post
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default MessageInputCard;

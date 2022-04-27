import React, { useRef, useState, useEffect } from "react";
import {
  Box,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  useDisclosure,
  InputGroup,
  Input,
  InputLeftElement,
  Image,
  useToast,
} from "@chakra-ui/react";

import { AddIcon, SearchIcon } from "@chakra-ui/icons";

// API
import { getTrendingGIFs, getSearchedGIFs } from "../api/giphy";

// Context state
import { useMessages } from "../contexts/MessageContext";

const AddGIF = () => {
  // To manage popover states
  const { onOpen, onClose, isOpen } = useDisclosure();

  // Fetching state from message context
  const { setMedia } = useMessages();

  // For popover search field focus
  const searchFieldRef = useRef(null);

  const [searchTerm, setSearchTerm] = useState("");

  const [GIFs, setGIFs] = useState([]);

  const toast = useToast();

  // Function to fecth trending GIFs
  const fetchTrendingGIFs = async () => {
    try {
      const data = await getTrendingGIFs();
      setGIFs(data);
    } catch (error) {
      toast({
        title: "Error",
        description: error.response
          ? error.response.data.message
          : "Server error",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  // Fetch trending GIFs on mount
  useEffect(() => {
    fetchTrendingGIFs();
  }, []);

  // Function to select a GIF
  const handleGIFclick = (GIF) => {
    const data = {
      type: "GIF",
      data: GIF,
    };
    setMedia(data);
    onClose();
  };

  // Function to search for GIFs
  const handleGIFsearch = async () => {
    if (searchTerm === "") {
      fetchTrendingGIFs();
    } else {
      try {
        const data = await getSearchedGIFs(searchTerm);
        setGIFs(data);
      } catch (error) {
        toast({
          title: "Error",
          description: error.response
            ? error.response.data.message
            : "Server error",
          status: "error",
          duration: 4000,
          isClosable: true,
        });
      }
    }
  };

  // Delay debounce function : Fetch GIFs only when the user has stopped typing to reduce API calls
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      handleGIFsearch();
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  return (
    <Box>
      {/* GIFs popover component */}
      <Popover
        isOpen={isOpen}
        initialFocusRef={searchFieldRef}
        onOpen={onOpen}
        onClose={onClose}
        placement="bottom-start"
        closeOnBlur={false}
      >
        <PopoverTrigger>
          <Button leftIcon={<AddIcon />} mt={[6]}>
            Add GIF
          </Button>
        </PopoverTrigger>

        <PopoverContent p={5}>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverBody>
            {/* GIF Search input */}
            <Box>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<SearchIcon color="gray.300" />}
                />
                <Input
                  type="text"
                  ref={searchFieldRef}
                  placeholder="Search for a GIF here"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </InputGroup>
            </Box>

            {/* GIFs */}
            <Box maxHeight={"400px"} overflowY={"scroll"} mt={[4]}>
              {GIFs.map((GIF) => (
                <Box key={GIF.id} mb={[1]} onClick={() => handleGIFclick(GIF)}>
                  <Image src={GIF.images.original.url} />
                </Box>
              ))}
            </Box>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Box>
  );
};

export default AddGIF;

import Axios from "axios";

// API call to get trending gifs
export const getTrendingGIFs = async () => {
  const response = await Axios.get("https://api.giphy.com/v1/gifs/trending", {
    params: {
      api_key: process.env.REACT_APP_GIPHY_API_KEY,
      limit: 25,
    },
  });
  return response.data.data;
};

// API call to get gifs by search term
export const getSearchedGIFs = async (searchTerm) => {
  const response = await Axios.get("https://api.giphy.com/v1/gifs/search", {
    params: {
      api_key: process.env.REACT_APP_GIPHY_API_KEY,
      q: searchTerm,
      limit: 25,
    },
  });
  return response.data.data;
};

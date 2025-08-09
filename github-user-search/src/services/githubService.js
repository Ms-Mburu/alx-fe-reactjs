import axios from 'axios';

export const searchUsersAdvanced = async (query) => {
  const response = await axios.get(`https://api.github.com/search/users?q=${encodeURIComponent(query)}`);
  return response.data;
};
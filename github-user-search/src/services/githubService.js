import axios from 'axios';

export const fetchUserData = async (username) => {
  const response = await axios.get(`https://api.github.com/users/${username}`);
  return response.data;
};

// New function for advanced search with location and minRepos filters
export const searchUsersAdvanced = async ({ username = '', location = '', minRepos = 0 }) => {
  let query = '';
  if (username) query += `${username} in:login`;
  if (location) query += ` location:${location}`;
  if (minRepos > 0) query += ` repos:>=${minRepos}`;

  const response = await axios.get(`https://api.github.com/search/users?q=${encodeURIComponent(query.trim())}`);
  return response.data;
};

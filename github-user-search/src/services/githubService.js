import axios from 'axios';

const BASE_URL = 'https://api.github.com';

export async function fetchUserData(username) {
  const response = await axios.get(`${BASE_URL}/users/${username}`);
  return response.data;
}

export async function searchUsersAdvanced(query) {
  const response = await axios.get(`${BASE_URL}/search/users?q=${encodeURIComponent(query)}`);
  return response.data;
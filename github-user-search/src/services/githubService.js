
import axios from 'axios';
const BASE_URL = 'https://api.github.com';

export const fetchUserData = async (username) => {
  if (!username) throw new Error('No username provided');
  const res = await axios.get(`${BASE_URL}/users/${encodeURIComponent(username)}`);
  return res.data;
};


export const searchUsersAdvanced = async (query, page = 1, per_page = 30) => {
  if (!query) throw new Error('No query provided');
  const res = await axios.get(`${BASE_URL}/search/users`, {
    params: { q: query, page, per_page },
  });
  return res.data;
};


export const fetchUsersDetailsFromItems = async (items = []) => {
  if (!items.length) return [];
  const requests = items.map((it) =>
    axios
      .get(`${BASE_URL}/users/${encodeURIComponent(it.login)}`)
      .then((r) => ({ ...it, ...r.data })) 
      .catch(() => ({ ...it, error: true })) 
  );
  const results = await Promise.all(requests);
  return results;
};

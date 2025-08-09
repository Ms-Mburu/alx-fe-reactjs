import React, { useState } from 'react';
import { searchUsersAdvanced } from '../services/githubService';

function Search() {
  const [username, setUsername] = useState('');
  const [location, setLocation] = useState('');
  const [minRepos, setMinRepos] = useState('');
  const [users, setUsers] = useState([]); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setUsers([]);

    try {
      const query = `${username ? `${username} in:login` : ''} ${
        location ? `location:${location}` : ''
      } ${minRepos ? `repos:>=${minRepos}` : ''}`;
      const data = await searchUsersAdvanced(query.trim());
      setUsers(data.items || []);
    } catch (err) {
      setError('Looks like we cant find the user');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <form onSubmit={handleSearch} className="flex flex-col gap-2 mb-4">
        <input
          type="text"
          placeholder="Search GitHub username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="flex-1 px-3 py-2 border rounded"
        />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="flex-1 px-3 py-2 border rounded"
        />
        <input
          type="number"
          placeholder="Min Repos"
          value={minRepos}
          onChange={(e) => setMinRepos(e.target.value)}
          className="flex-1 px-3 py-2 border rounded"
        />
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
          Search
        </button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {users.length > 0 && (
        <ul className="grid gap-4 mt-4">
          {users.map((u) => (
            <li key={u.id} className="p-4 border rounded flex items-center gap-4">
              <img src={u.avatar_url} alt={u.login} className="w-12 h-12 rounded-full" />
              <div>
                <p className="font-semibold">{u.login}</p>
                <a
                  href={u.html_url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-500 underline"
                >
                  GitHub Profile
                </a>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Search;

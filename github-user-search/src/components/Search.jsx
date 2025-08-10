import React, { useState } from 'react';
import { searchUsersAdvanced, fetchUsersDetailsFromItems } from '../services/githubService';

const PER_PAGE = 10; 

function buildQuery(username, location, minRepos) {
  const parts = [];
  if (username) parts.push(`${username} in:login`);
  if (location) parts.push(`location:${location}`);
  if (minRepos) parts.push(`repos:>=${minRepos}`);
 
  return parts.join(' ');
}

export default function Search() {
  const [username, setUsername] = useState('');
  const [location, setLocation] = useState('');
  const [minRepos, setMinRepos] = useState('');
  const [users, setUsers] = useState([]); 
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);
  const [lastQuery, setLastQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e && e.preventDefault();
    setError('');
    setUsers([]);
    setTotalCount(0);
    setPage(1);

    const q = buildQuery(username.trim(), location.trim(), minRepos.toString().trim());
    if (!q) {
      setError('Please enter a username or other search criteria');
      return;
    }

    setLoading(true);
    try {
      const data = await searchUsersAdvanced(q, 1, PER_PAGE);
      if (!data || !data.items || data.total_count === 0) {
        setError('Looks like we cant find the user');
        setUsers([]);
        setTotalCount(0);
        setLastQuery(q);
        return;
      }

      const merged = await fetchUsersDetailsFromItems(data.items);
      setUsers(merged);
      setTotalCount(data.total_count);
      setLastQuery(q);
      setPage(1);
    } catch (err) {
      setError('Looks like we cant find the user');
    } finally {
      setLoading(false);
    }
  };

  const loadMore = async () => {
    if (!lastQuery) return;
    const nextPage = page + 1;
    setLoadingMore(true);
    try {
      const data = await searchUsersAdvanced(lastQuery, nextPage, PER_PAGE);
      if (data && data.items && data.items.length) {
        const merged = await fetchUsersDetailsFromItems(data.items);
        setUsers((prev) => [...prev, ...merged]);
        setPage(nextPage);
      }
    } catch (err) {
      setError('Looks like we cant find the user');
    } finally {
      setLoadingMore(false);
    }
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-3 items-end mb-6">
        <div className="md:col-span-2">
          <label className="sr-only">Username</label>
          <input
            type="text"
            placeholder="Username (e.g. octocat)"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <div>
          <label className="sr-only">Location</label>
          <input
            type="text"
            placeholder="Location (e.g. Nairobi)"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <div>
          <label className="sr-only">Min Repos</label>
          <input
            type="number"
            min="0"
            placeholder="Min Repos"
            value={minRepos}
            onChange={(e) => setMinRepos(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <div className="md:col-span-4 flex gap-2">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded"
            onClick={handleSearch}
          >
            Search
          </button>
          <button
            type="button"
            className="px-3 py-2 border rounded"
            onClick={() => {
              setUsername('');
              setLocation('');
              setMinRepos('');
              setUsers([]);
              setError('');
              setTotalCount(0);
              setLastQuery('');
              setPage(1);
            }}
          >
            Clear
          </button>
        </div>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && users.length > 0 && (
        <>
          <p className="mb-2 text-sm text-gray-600">Showing {users.length} of {totalCount} results</p>
          <ul className="grid gap-4">
            {users.map((u) => (
              <li key={u.id} className="p-4 border rounded flex items-center gap-4">
                <img src={u.avatar_url} alt={u.login} className="w-12 h-12 rounded-full" />
                <div className="flex-1">
                  <div className="flex items-baseline gap-3">
                    <span className="font-semibold">{u.name || u.login}</span>
                    <a href={u.html_url} target="_blank" rel="noreferrer" className="text-blue-500 underline text-sm">
                      @{u.login}
                    </a>
                  </div>
                  <p className="text-sm text-gray-600">
                    {u.location ? `Location: ${u.location}` : 'Location: —'} • Repos: {u.public_repos ?? '—'}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          {users.length < totalCount && (
            <div className="mt-4 text-center">
              <button
                onClick={loadMore}
                className="px-4 py-2 bg-gray-800 text-white rounded"
                disabled={loadingMore}
              >
                {loadingMore ? 'Loading...' : 'Load more'}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
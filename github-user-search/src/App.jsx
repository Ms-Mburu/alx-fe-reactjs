import React from 'react';
import Search from './components/Search';

function App() {
  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-center mb-6">GitHub User Search</h1>
      <Search />
    </main>
  );
}

export default App;
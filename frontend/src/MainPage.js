import React, { useState, useEffect } from 'react';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const MainPage = () => {
  const [userData, setUserData] = useState({
    userName: '',
    savedArtists: [],
    savedAlbums: []
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('http://localhost:5000/main');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setUserData({
          userName: data.userName || '',
          savedArtists: data.savedArtists || [],
          savedAlbums: data.savedAlbums || []
        });
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-zinc-900">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-zinc-900 min-h-screen">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Error loading data: {error}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-900 text-white p-6">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">Welcome to Trackr, {userData.userName}!</h1>
        <p className="text-zinc-400">Explore your Spotify tracks, albums, and artists.</p>
        <a href="/logout" className="text-green-500 hover:text-green-400 mt-2 inline-block">
          Logout
        </a>
      </div>

      {/* Content Sections */}
      <div className="space-y-8">
        {/* Artists Section */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Saved Artists</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {userData.savedArtists && userData.savedArtists.length > 0 ? (
              userData.savedArtists.map((artist, index) => (
                <div 
                  key={index}
                  className="bg-zinc-800 p-4 rounded-lg hover:bg-zinc-700 transition-colors"
                >
                  <img
                    src={artist.imageUrl || '/api/placeholder/150/150'}
                    alt={artist.name}
                    className="w-full aspect-square object-cover rounded-md mb-2"
                  />
                  <p className="text-center font-medium">{artist.name}</p>
                </div>
              ))
            ) : (
              <p className="text-zinc-400 col-span-full">No saved artists yet.</p>
            )}
          </div>
        </section>

        {/* Albums Section */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Saved Albums</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {userData.savedAlbums && userData.savedAlbums.length > 0 ? (
              userData.savedAlbums.map((album, index) => (
                <div 
                  key={index}
                  className="bg-zinc-800 p-4 rounded-lg hover:bg-zinc-700 transition-colors"
                >
                  <img
                    src={album.imageUrl || '/api/placeholder/150/150'}
                    alt={album.name}
                    className="w-full aspect-square object-cover rounded-md mb-2"
                  />
                  <p className="text-center font-medium">{album.name}</p>
                </div>
              ))
            ) : (
              <p className="text-zinc-400 col-span-full">No saved albums yet.</p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default MainPage;
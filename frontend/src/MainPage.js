// src/MainPage.js
import React from 'react';

// Example data (you will replace this with data from the backend)
const savedArtists = [
  { name: "Artist 1", imageUrl: "https://via.placeholder.com/150" },
  { name: "Artist 2", imageUrl: "https://via.placeholder.com/150" },
  { name: "Artist 3", imageUrl: "https://via.placeholder.com/150" },
];

const savedAlbums = [
  { name: "Album 1", imageUrl: "https://via.placeholder.com/150" },
  { name: "Album 2", imageUrl: "https://via.placeholder.com/150" },
  { name: "Album 3", imageUrl: "https://via.placeholder.com/150" },
];

const MainPage = ({ userName }) => {
  return (
    <div style={styles.container}>
      {/* Welcome Message */}
      <div style={styles.welcomeContainer}>
        <h1>Welcome, {userName}!</h1>
      </div>

      {/* Saved Artists Section */}
      <div style={styles.sectionContainer}>
        <h2>Saved Artists</h2>
        <div style={styles.itemsContainer}>
          {savedArtists.map((artist, index) => (
            <div key={index} style={styles.itemCard}>
              <img src={artist.imageUrl} alt={artist.name} style={styles.itemImage} />
              <p>{artist.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Saved Albums Section */}
      <div style={styles.sectionContainer}>
        <h2>Saved Albums</h2>
        <div style={styles.itemsContainer}>
          {savedAlbums.map((album, index) => (
            <div key={index} style={styles.itemCard}>
              <img src={album.imageUrl} alt={album.name} style={styles.itemImage} />
              <p>{album.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    backgroundColor: '#121212',
    color: 'white',
    fontFamily: 'Spotify Circular, Arial, sans-serif',
  },
  welcomeContainer: {
    textAlign: 'center',
    marginBottom: '30px',
  },
  sectionContainer: {
    marginBottom: '40px',
  },
  itemsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
  },
  itemCard: {
    width: '150px',
    textAlign: 'center',
    margin: '10px',
    backgroundColor: '#282828',
    borderRadius: '8px',
    padding: '10px',
    transition: 'transform 0.3s ease-in-out',
  },
  itemImage: {
    width: '100%',
    borderRadius: '8px',
  },
};

export default MainPage;

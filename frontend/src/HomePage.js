// src/HomePage.js
import React from 'react';

const HomePage = () => {
  const handleLogin = () => {
    // Redirect to the Spotify login page
    window.location.href = 'http://localhost:5000/login';
  };

  return (
    <div style={styles.container}>
      <h1>Welcome to Trackr!</h1>
      <p>Your personal music tracking app</p>
      <div style={styles.buttonContainer}>
        <button style={styles.button} onClick={handleLogin}>Login with Spotify</button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#171313', // Background color 
    color: 'white',
    fontFamily: '"Circular", Arial, sans-serif', // Use Spotify's official font here
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '20px',
    borderRadius: '50px',
    padding: '10px 30px', // Add padding around the button to give it more space
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#1DB954', // Spotify Green for button color
    border: 'none',
    borderRadius: '50px', // Capsule shape for button
    fontSize: '16px',
    cursor: 'pointer',
    width: '200px', // Optional: specify width for button size
    fontWeight: 'bold', // Optional: make the text bold
  },
};

export default HomePage;

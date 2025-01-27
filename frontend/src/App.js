import React from 'react';
import './App.css';
import HomePage from './HomePage'; // Import the HomePage component
import MainPage from './MainPage'; // Import the MainPage 

function App() {
  return (
    <div className="App">
      <HomePage /> {/* Render the HomePage component */}
      <MainPage /> {/* Render the MainPage component */}
    </div>
  );
}

export default App;

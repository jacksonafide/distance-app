import React from 'react';
import Geocode from './components/Geocode/Geocode';
import './App.css';
import classes from './App.module.css';

function App() {
  return (
    <div className="App">
      <header className = {classes.Header}>
        Distance between cities
      </header>
      <main className = {classes.Main}>
        <Geocode />
      </main>
      <footer className = {classes.Footer}>
        Created by jacksonafide.
      </footer>
    </div>
  );
}

export default App;
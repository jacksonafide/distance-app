import React from 'react';
import Geocode from './components/Geocode/Geocode';
import './App.css';
import classes from './App.module.css';
import logo from './assets/logo.png';

function App() {
  return (
    <div className="App">
      <header className = {classes.Header}>
        <p className = {classes.Title}><img className = {classes.Logo} src = {logo} alt = "logo" height = "42" width = "50"/>Distance between cities</p>
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
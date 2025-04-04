import React from 'react';
import './App.css';
import Metronome from './components/Metronome';

function App() {
  return (
    <div className="App">
      <header className="app-header">
        <h1>Metronome</h1>
      </header>
      <main className="app-main">
        <Metronome />
      </main>
    </div>
  );
}

export default App;

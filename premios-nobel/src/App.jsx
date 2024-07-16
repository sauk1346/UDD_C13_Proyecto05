import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <Header />
      <main className="container">
        <Outlet />
      </main>
    </div>
  );
}

export default App;
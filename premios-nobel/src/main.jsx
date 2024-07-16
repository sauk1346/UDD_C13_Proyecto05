import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import NobelList from './components/NobelList';
import NobelDetail from './components/NobelDetail';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<div>Home</div>} />
          <Route path="nobel" element={<NobelList />} />
          <Route path="nobel/:id" element={<NobelDetail />} />
        </Route>
      </Routes>
    </Router>
  </React.StrictMode>
);
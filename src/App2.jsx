import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { FaHome, FaDumbbell } from 'react-icons/fa'; // Importing icons
import Dashboard from './Dashboard';
import DailyChallenge from './DailyChallenge';
import './App2.css';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [caloriesBurned, setCaloriesBurned] = useState({ total: 0, challenges: {} });
  const [date, setDate] = useState('');

  const handleComplete = (calories, date) => {
    setCaloriesBurned(calories);
    setDate(date);
  };

  return (
    <Router>
      <div className="app">
        <nav className="sidebar">
          <ul>
            <li>
              <Link to="/">
                <FaHome className="icon" /> <span className="link-text">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link to="/challenge">
                <FaDumbbell className="icon" /> <span className="link-text">Daily Challenge</span>
              </Link>
            </li>
          </ul>
        </nav>
        <div className="content">
          <Routes>
            <Route path="/" element={<Dashboard caloriesBurned={caloriesBurned} date={date} />} />
            <Route path="/challenge" element={<DailyChallenge onComplete={handleComplete} />} />
          </Routes>
        </div>
        
      </div>
    </Router>
  );
}

export default App;

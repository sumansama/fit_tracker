import React, { useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import Calendar from 'react-calendar';
import { FaCalendar } from 'react-icons/fa';
import 'react-calendar/dist/Calendar.css';
import './Dashboard.css';

// Register the necessary Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = ({ caloriesBurned = { total: 0, challenges: {} }, date = '' }) => {
  const [calendarOpen, setCalendarOpen] = useState(false);

  // Data for the total calories burned chart
  const totalCaloriesData = {
    labels: ['Calories Burned', 'Remaining'],
    datasets: [
      {
        data: [caloriesBurned.total, 1000 - caloriesBurned.total], // Assuming 1000 is the goal
        backgroundColor: ['#FF6384', '#DDDDDD'],
        hoverBackgroundColor: ['#FF6384', '#DDDDDD'],
      },
    ],
  };

  // Data for the calories per challenge chart
  const challengeCaloriesData = {
    labels: Object.keys(caloriesBurned.challenges),
    datasets: [
      {
        data: Object.values(caloriesBurned.challenges),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
      },
    ],
  };

  const toggleCalendar = () => {
    setCalendarOpen(!calendarOpen);
  };

  return (
    <div className="dashboard">
      <div className="greeting">
        <p>Hi Suman</p>
      </div>
      <div className="profile-container">
        <div className="profile-pic"></div>
        <div className="profile-info">
          <p>Suman</p>
          <p>@suman</p>
        </div>
        <div className="personal-info">
          <div>
            <p>65 kg</p>
            <p>Weight</p>
          </div>
          <div>
            <p>178 cm</p>
            <p>Height</p>
          </div>
          <div>
            <p>21</p>
            <p>Age</p>
          </div>
        </div>
      </div>
      <div className="calendar-section">
        <p className="section-title">Calendar</p>
        <div className="calendar-toggle" onClick={toggleCalendar}>
          <FaCalendar size={24} />
        </div>
        {calendarOpen && (
          <div className="calendar-wrapper">
            <Calendar />
          </div>
        )}
      </div>
      <div className="charts-container">
        <div className="chart-wrapper small-chart">
          <Doughnut data={totalCaloriesData} />
          <p>Total Calories Burned: {caloriesBurned.total}</p>
        </div>
        <div className="chart-wrapper small-chart">
          <Doughnut data={challengeCaloriesData} />
          <p>Calories Burned Per Challenge</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

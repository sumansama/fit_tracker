import React, { useState } from 'react';
import { Checkbox, Button, Typography, List, ListItem, ListItemText, Divider } from '@mui/material';
import { toast, ToastContainer, Bounce } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import './DailyChallenge.css';

const exercises = [
  { name: 'Push Up', reps: 10, calories: 10 },
  { name: 'Jump Rope', reps: 50, calories: 5 },
  { name: 'Deadlift', reps: 7, calories: 15 },
  { name: 'Squat', reps: 10, calories: 12 },
];

const days = [
  { day: 'Day 1', exercises: exercises.map(e => ({ ...e, reps: e.reps + 0 })) },
  { day: 'Day 2', exercises: exercises.map(e => ({ ...e, reps: e.reps + 5 })) },
  { day: 'Day 3', exercises: exercises.map(e => ({ ...e, reps: e.reps + 10 })) },
  { day: 'Day 4', exercises: exercises.map(e => ({ ...e, reps: e.reps + 15 })) },
  { day: 'Day 5', exercises: exercises.map(e => ({ ...e, reps: e.reps + 20 })) },
  { day: 'Day 6', exercises: exercises.map(e => ({ ...e, reps: e.reps + 25 })) },
];

const DailyChallenge = ({ onComplete }) => {
  const [checkedExercises, setCheckedExercises] = useState([]);
  const [completed, setCompleted] = useState(false);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  //const navigate = useNavigate();

  const handleCheck = (exercise) => {
    const newCheckedExercises = checkedExercises.includes(exercise)
      ? checkedExercises.filter(e => e !== exercise)
      : [...checkedExercises, exercise];

    setCheckedExercises(newCheckedExercises);
    setCompleted(newCheckedExercises.length === exercises.length);
  };

  const handleComplete = () => {
    let totalCalories = 0;
    const challengeCalories = {};

    checkedExercises.forEach((exercise) => {
      const { name, reps, calories } = exercises.find(e => e.name === exercise);
      const burned = reps * calories;
      totalCalories += burned;
      challengeCalories[name] = burned;
    });

    onComplete({ total: totalCalories, challenges: challengeCalories }, date);
    toast('🦄 Challenge Is Completed!', {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  };

  return (
    <div>
      <div className="daily-challenge">
        <Typography variant="h6" className="challenge-title">Date: {date}</Typography>
        <Typography variant="h4" gutterBottom>Daily Challenge</Typography>
        <List>
          {exercises.map((exercise) => (
            <ListItem key={exercise.name} className="challenge-item">
              <Checkbox
                checked={checkedExercises.includes(exercise.name)}
                onChange={() => handleCheck(exercise.name)}
              />
              <ListItemText primary={`${exercise.name} ${exercise.reps} Times`} />
            </ListItem>
          ))}
        </List>
        <Divider />
        {completed && (
          <Button
            variant="contained"
            color="primary"
            className="complete-button"
            onClick={handleComplete}
          >
            Completed
          </Button>
        )}
        <ToastContainer
          position="top-center"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Bounce}
        />
      </div>
      <div className="upcoming-challenges">
        <Typography variant="h5" gutterBottom>Upcoming Challenges</Typography>
        {days.map((day, index) => (
          <div key={index} className="day-challenge">
            <Typography variant="h6" className="day-title">{day.day}</Typography>
            <List>
              {day.exercises.map((exercise) => (
                <ListItem key={exercise.name} className="challenge-item">
                  <ListItemText primary={`${exercise.name} ${exercise.reps} Times`} />
                </ListItem>
              ))}
            </List>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DailyChallenge;

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TaskList from './components/TaskList';
import TimePlanner from './components/TimePlanner';
import Reflection from './components/Reflection';
import GoalPage from './pages/GoalPage.jsx';
import Navbar from './components/NavBar';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <header>
          <h1>Dynamic Planner</h1>
          <Navbar />
        </header>
        <main>
          <Routes>
            <Route path="/" element={<TaskList />} />
            <Route path="/time-planner" element={<TimePlanner />} />
            <Route path="/reflection" element={<Reflection />} />
            <Route path="/goals" element={<GoalPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
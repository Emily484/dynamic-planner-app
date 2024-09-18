import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { TaskProvider } from './context/TaskContext';
import { GoalProvider } from './context/GoalContext';

ReactDOM.render(
  <TaskProvider>
    <GoalProvider>
      <App />
    </GoalProvider>
  </TaskProvider>,
  document.getElementById('root')
);
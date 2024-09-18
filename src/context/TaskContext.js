import React, { createContext, useState, useEffect } from 'react';
import Task from '../models/Task';
import Goal from '../models/Goal';

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState([]);
    const [goals, setGoals] = useState([]);

    // Add a new task
    const addTask = (title, duration, priority, type) => {
        const newTask = new Task(title, duration, priority, type);
        setTasks(prevTasks => [...prevTasks, newTask]);
    };

    // Add a new goal
    const addGoal = (title, category, priority, term) => {
        const newGoal = new Goal(title, category, priority, term);
        setGoals(prevGoals => [...prevGoals, newGoal]);
    };

    // Edit a task
    const editTask = (id, updatedTask) => {
        setTasks(prevTasks => prevTasks.map(task => task.id === id ? updatedTask : task));
    };

    // Remove a task
    const removeTask = (id) => {
        setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
    };

    useEffect(() => {
        const storedTasks = JSON.parse(localStorage.getItem('tasks'));
        const storedGoals = JSON.parse(localStorage.getItem('goals'));
        if (storedTasks) setTasks(storedTasks);
        if (storedGoals) setGoals(storedGoals);
    }, []);

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
        localStorage.setItem('goals', JSON.stringify(goals));
    }, [tasks, goals]);

    return (
        <TaskContext.Provider value={{ tasks, goals, addTask, addGoal, editTask, removeTask }}>
            {children}
        </TaskContext.Provider>
    );
};

export default TaskContext;
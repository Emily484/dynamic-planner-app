import React, { createContext, useState, useEffect } from 'react';
import Goal from '../models/Goal';

const GoalContext = createContext();

export const GoalProvider = ({ children }) => {
    const [goals, setGoals] = useState([]);

    // Add a new goal
    const addGoal = (title, category, priority, term, deadline) => {
        const newGoal = new Goal(title, category, priority, term, deadline);
        setGoals(prevGoals => [...prevGoals, newGoal]);
    };

    // Edit a goal
    const editGoal = (id, updatedGoal) => {
        setGoals(prevGoals => prevGoals.map(goal => goal.id === id ? updatedGoal : goal));
    };

    // Remove a goal
    const removeGoal = (id) => {
        setGoals(prevGoals => prevGoals.filter(goal => goal.id !== id));
    };

    useEffect(() => {
        const storedGoals = JSON.parse(localStorage.getItem('goals'));
        if (storedGoals) setGoals(storedGoals);
    }, []);

    useEffect(() => {
        localStorage.setItem('goals', JSON.stringify(goals));
    }, [goals]);

    return (
        <GoalContext.Provider value={{ goals, addGoal, editGoal, removeGoal }}>
            {children}
        </GoalContext.Provider>
    );
};

export default GoalContext;
import React, { useContext, useState } from 'react';
import GoalContext from '../context/GoalContext';
import './GoalPage.css';

const GoalPage = () => {
    const { goals, addGoal, removeGoal, editGoal } = useContext(GoalContext);
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [priority, setPriority] = useState('');
    const [term, setTerm] = useState('short-term');
    const [deadline, setDeadline] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [currentGoal, setCurrentGoal] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEditing) {
            editGoal(currentGoal.id, { ...currentGoal, title, category, priority, term, deadline });
            setIsEditing(false);
            setCurrentGoal(null);
        } else {
            addGoal(title, category, priority, term, deadline);
        }
        setTitle('');
        setCategory('');
        setPriority('');
        setTerm('short-term');
        setDeadline('');
    };

    const handleEditClick = (goal) => {
        setIsEditing(true);
        setCurrentGoal(goal);
        setTitle(goal.title);
        setCategory(goal.category);
        setPriority(goal.priority);
        setTerm(goal.term);
        setDeadline(goal.deadline);
    };

    // Sort goals by priority in descending order
    const sortedGoals = [...goals].sort((a, b) => b.priority - a.priority);

    return (
        <div className="goal-page">
            <h2>Goals</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text"
                    placeholder="Goal title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <input 
                    type="text"
                    placeholder="Category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                />
                <input 
                    type="number"
                    placeholder="Priority (numeric)"
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                />
                <select value={term} onChange={(e) => setTerm(e.target.value)}>
                    <option value="short-term">Short-term</option>
                    <option value="long-term">Long-term</option>
                </select>
                <input 
                    type="date"
                    placeholder="Deadline"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                />
                <button type="submit">{isEditing ? 'Update Goal' : 'Add Goal'}</button>
            </form>
            <ul>
                {sortedGoals.map((goal) => (
                    <li key={goal.id}>
                        {goal.title} ({goal.category}, Priority: {goal.priority}, {goal.term}, Deadline: {goal.deadline})
                        <button onClick={() => handleEditClick(goal)}>Edit</button>
                        <button onClick={() => removeGoal(goal.id)}>Remove</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default GoalPage;
import React, { useContext, useState } from 'react';
import TaskContext from '../context/TaskContext';

const TaskList = () => {
    const { tasks, addTask, removeTask, editTask } = useContext(TaskContext);
    const [title, setTitle] = useState('');
    const [duration, setDuration] = useState('');
    const [priority, setPriority] = useState('');
    const [type, setType] = useState('cleaning');
    const [isEditing, setIsEditing] = useState(false);
    const [currentTask, setCurrentTask] = useState(null);
    const [isBreakable, setIsBreakable] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEditing) {
            editTask(currentTask.id, { ...currentTask, title, duration, priority, type, isBreakable });
            setIsEditing(false);
            setCurrentTask(null);
        } else {
            addTask(title, duration, priority, type, isBreakable);
        }
        setTitle('');
        setDuration('');
        setPriority('');
        setIsBreakable(false);
    };

    const handleEditClick = (task) => {
        setIsEditing(true);
        setCurrentTask(task);
        setTitle(task.title);
        setDuration(task.duration);
        setPriority(task.priority);
        setType(task.type);
        setIsBreakable(task.isBreakable);
    };

    const weekSchedule = [
        { day: "Thursday 9/19", availableHours: 8.25, tasks: []},
        { day: "Friday 9/20", availableHours: 8.25, tasks: []},
        { day: "Saturday 9/21", availableHours: 8.25, tasks: []},
        { day: "Sunday 9/22", availableHours: 7.75, tasks: []},
        { day: "Monday 9/23", availableHours: 8.25, tasks: []},
        { day: "Tuesday 9/24", availableHours: 7, tasks: []},
        { day: "Wednesday 9/25", availableHours: 8.25, tasks: []},
        { day: "Thursday 9/26", availableHours: 8.25, tasks: []},
        { day: "Thursday 9/27", availableHours: 8.25, tasks: []}
    ];

    const sortedTasks = tasks.sort((a, b) => b.priority - a.priority);

    sortedTasks.forEach(task => {
        let taskDuration = task.duration / 60;
        for (let i = 0; i < weekSchedule.length; i++) {
            if (weekSchedule[i].availableHours >= taskDuration) {
                weekSchedule[i].tasks.push(task);
                weekSchedule[i].availableHours -= taskDuration;
                break;
            } else if (task.isBreakable && weekSchedule[i].availableHours > 0) {
                const allocatedHours = weekSchedule[i].availableHours;
                weekSchedule[i].tasks.push({ ...task, duration: allocatedHours * 60 });
                weekSchedule[i].availableHours = 0;
                taskDuration -= allocatedHours;
            }
        }
    });

    // Calculate the total duration of all tasks
    const totalDuration = tasks.reduce((total, task) => total + parseInt(task.duration, 10), 0);

    return (
        <div>
            <h2>Task List</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text"
                    placeholder="Task title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <input 
                    type="number"
                    placeholder="Duration (min)"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                />
                <input 
                    type="number"
                    placeholder="Priority (numeric)"
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                />
                <select value={type} onChange={(e) => setType(e.target.value)}>
                    <option value="cleaning">Cleaning</option>
                    <option value="goal-setting">Goal-Setting</option>
                </select>
                <label>
                    <input 
                        type="checkbox"
                        checked={isBreakable}
                        onChange={(e) => setIsBreakable(e.target.checked)}
                    />
                    Breakable
                </label>
                <button type="submit">{isEditing ? 'Update Task' : 'Add Task'}</button>
            </form>
            <ul>
                {tasks.map((task) => (
                    <li key={task.id}>
                        {task.title} ({task.duration} min, Priority: {task.priority}, {task.type}, Breakable: {task.isBreakable ? 'Yes' : 'No'})
                        <button onClick={() => handleEditClick(task)}>Edit</button>
                        <button onClick={() => removeTask(task.id)}>Remove</button>
                    </li>
                ))}
            </ul>
            <div>
                <h3>Total Duration: {Math.floor(totalDuration / 60)} hour {totalDuration % 60} min </h3>
            </div>
            <div className="weekly-planner">
                {weekSchedule.map(day => (
                    <div className="day" key={day.day}>
                        <h3>{day.day}</h3>
                        <ul>
                            {day.tasks.map((task, index) => (
                                <li key={index}>{task.title} ({task.duration} min)</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TaskList;
class Task {
    constructor(title, duration, priority, type, status = 'pending') {
        this.id = Date.now(); // Unique ID for each task
        this.title = title;
        this.duration = duration; // Duration in minutes
        this.priority = parseInt(priority, 10); // Numeric priority
        this.type = type; // 'cleaning' or 'goal-setting'
        this.status = status; // 'pending', 'in-progress', 'completed'
    }
}

export default Task;
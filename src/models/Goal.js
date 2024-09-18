class Goal {
    constructor(title, category, priority, term, deadline) {
        this.id = Date.now(); // Unique ID for each goal
        this.title = title;
        this.category = category; // e.g., career, health, personal development
        this.priority = parseInt(priority, 10); // Numeric priority
        this.term = term; // 'short-term' or 'long-term'
        this.deadline = deadline; // Deadline for the goal
    }
}

export default Goal;
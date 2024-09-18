const weekSchedule = [
    {day: "Monday", availableHours: 8, tasks: [] },
    {day: "Tuesday", availableHours: 6, tasks: [] },
    {day: "Wednesday", availableHours: 5, tasks: [] },
    {day: "Thursday", availableHours: 7, tasks: [] },
    {day: "Friday", availableHours: 4, tasks: [] },
    {day: "Saturday", availableHours: 2, tasks: [] },
    {day: "Sunday", availableHours: 6, tasks: [] }
];

const sortedTasks = tasks.sort((a, b) => b.priority - a.priority);

sortedTasks.forEach(task => {
    for (let i = 0; i < weekSchedule.length; i++) {
        if (weekSchedule[i].availableHours >= task.duration) {
            weekSchedule[i].taks.push(task);
            weekSchedule[i].avialbeHours -= task.duration;
            break;
        }
    }
})
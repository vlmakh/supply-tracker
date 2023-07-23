export const reducer = (tasks, action) => {
  switch (action.type) {
    case 'getTasks':
      if (!action.tasks) {
        return;
      }
      return action.tasks;

    case 'addTask':
      return [...tasks, action.newTask];

    case 'deleteTask':
      return tasks.filter(task => task._id !== action.taskId);

    case 'editTask':
      return tasks.map(task => {
        return task._id === action.taskId ? action.newTask : task;
      });

    case 'uncompletedTasks':
      return tasks.filter(task => task.completed === false);

    default:
      return tasks;
  }
};

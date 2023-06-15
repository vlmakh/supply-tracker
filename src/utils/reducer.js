export const reducer = (tasks, action) => {
  switch (action.type) {
    case 'getTasks':
      if (!action.tasks) {
        return;
      }
      return action.tasks;

    case 'addTask':
      // const newTask = {
      //   ...action.newTask,
      // };
      return [...tasks, action.newTask];

    case 'deleteTask':
      return tasks.filter(task => task._id !== action.taskId);

    case 'editTask':
      //   const idx = tasks.findIndex(task => task._id === action.taskId);
      //   tasks.splice(idx, 1, action.newTask);
      //   return tasks;
      return tasks.map(task => {
        return task._id === action.taskId ? action.newTask : task;
      });

    default:
      return tasks;
  }
};

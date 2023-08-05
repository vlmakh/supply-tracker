import create from 'zustand';
import { login, logout } from 'utils/operations';

export const useUserStore = create(set => ({
  user: null,
  currentLang: 'en',
  isLoading: true,
  setUser(values, resetForm) {
    set({ isLoading: true });

    login(values)
      .then(data => {
        resetForm();
        localStorage.setItem('splmgr', JSON.stringify(data.token));
        set({ user: data.user });
      })
      .catch(error => {})
      .finally(() => {
        set({ isLoading: false });
      });
  },

  resetUser() {
    set({ isLoading: true });

    logout()
      .then(() => {
        localStorage.removeItem('splmgr');
      })
      .finally(() => {
        set({ user: null, isLoading: false });
      });
  },
}));

export const useUserListStore = create(set => ({
  userList: [],
}));

export const useTaskStore = create((set, get) => ({
  tasks: [],
  getTasks() {
    const tasks = get().tasks;
    const { length: total } = tasks;
    const completedTasks = tasks.filter(item => item.completed).length;
    set({ info: { total, completedTasks } });
  },
  addTask(newTask) {
    const tasks = [...get().tasks, newTask];
    set({ tasks });
  },
  editTask(newTask, taskId) {
    const tasks = get().tasks.map(task =>
      task._id === taskId ? newTask : task
    );
    set({ tasks });
  },
  deleteTask(taskId) {
    const tasks = get().tasks.filter(task => task._id !== taskId);
    set({ tasks });
  },
  filter(query) {
    const tasks = get().tasks.filter(task =>
      task.name.toLowerCase().includes(query.toLowerCase())
    );
    set({ tasks });
  },
}));

export const useIsLoading = create(set => ({
  isLoading: true,
}));

import { create } from 'zustand';
import {
  signup,
  login,
  logout,
  checkCurrentUser,
  updateUserName,
  updateUserPass,
} from 'utils/operations';

const initialState = {
  user: { email: '', name: '', role: '' },
  currentLang: 'en',
  isLoading: false,
};

export const useUserStore = create(set => ({
  ...initialState,

  signupUser(regData, resetForm) {
    set({ isLoading: true });

    signup(regData)
      .then(() => {
        resetForm();
      })
      .catch(error => {})
      .finally(() => {
        set({ isLoading: false });
      });
  },

  loginUser(values, resetForm) {
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

  checkUser() {
    set({ isLoading: true });

    checkCurrentUser()
      .then(data => {
        if (!data) {
          return;
        }
        set({ user: data });
      })
      .catch(error => {})
      .finally(() => {
        set({ isLoading: false });
      });
  },

  updateName(values, resetForm) {
    set({ isLoading: true });

    updateUserName(values)
      .then(data => {
        set(({ user }) => ({ user: { ...user, name: data.name } }));
        resetForm();
      })
      .catch(error => {})
      .finally(() => {
        set({ isLoading: false });
      });
  },

  updatePass(values, resetForm) {
    set({ isLoading: true });

    updateUserPass(values)
      .then(() => {
        // set(({ user }) => ({ user: { ...user, name: data.name } }));
        resetForm();
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
        set(initialState);
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

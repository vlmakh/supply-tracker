import { create } from "zustand";
import {
  signup,
  login,
  logout,
  checkCurrentUser,
  updateUserName,
  updateUserPass,
} from "../utils/operations";
import {
  getTasksByRange,
  getUncompletedTasksByRange,
  getTasksByDateOrder,
  getTasksByDateInvoice,
  getTasksByDatePayment,
  getTasksByDateETD,
  getTasksByDateETA,
  deleteTask,
  updateTaskOwner,
  updateTask,
  addTask,
} from "../utils/operations";
import { getAllUsers } from "../utils/operations";
import { IUserState, ITaskState, IUserListState, ITask } from "../components/types";
 
const initialUserState = {
  user: { email: "", name: "", role: "" },
  currentLang: "en",
  isLoading: false,
};

export const useUserStore = create<IUserState>()((set) => ({
  ...initialUserState,

  signupUser(regData, resetForm) {
    set({ isLoading: true });

    signup(regData)
      .then(() => {
        resetForm();
      })
      .catch((error) => {})
      .finally(() => {
        set({ isLoading: false });
      });
  },

  loginUser(values, resetForm) {
    set({ isLoading: true });

    login(values)
      .then((data) => {
        resetForm();
        localStorage.setItem("splmgr", JSON.stringify(data.token));
        set({ user: data.user });
      })
      .catch((error) => {})
      .finally(() => {
        set({ isLoading: false });
      });
  },

  checkUser() {
    set({ isLoading: true });

    checkCurrentUser()
      .then((data) => {
        if (!data) {
          return;
        }
        set({ user: data });
      })
      .catch((error) => {})
      .finally(() => {
        set({ isLoading: false });
      });
  },

  updateName(values, resetForm) {
    set({ isLoading: true });

    updateUserName(values)
      .then((data) => {
        set(({ user }) => ({ user: { ...user, name: data.name } }));
        resetForm();
      })
      .catch((error) => {})
      .finally(() => {
        set({ isLoading: false });
      });
  },

  updatePass(values, resetForm) {
    set({ isLoading: true });

    updateUserPass(values)
      .then(() => {
        resetForm();
      })
      .catch((error) => {})
      .finally(() => {
        set({ isLoading: false });
      });
  },

  resetUser() {
    set({ isLoading: true });

    logout()
      .then(() => {
        localStorage.removeItem("splmgr");
      })
      .catch((e) => console.log(e))
      .finally(() => {
        set(initialUserState);
      });
  },
}));

export const useTaskStore = create<ITaskState>((set, get) => ({
  tasks: [],
  info: {
    total: 0,
    completed: 0,
  },
  isLoading: false,

  hadleGetUncompletedTasksByRange(start, end) {
    set({ isLoading: true });

    getUncompletedTasksByRange(start, end)
      .then((tasks) => {
        set({ tasks });

        const { length: total } = tasks;
        const completed = tasks.filter((item: ITask) => item.completed).length;

        set({ info: { total, completed } });
      })
      .catch((error) => {})
      .finally(() => {
        set({ isLoading: false });
      });
  },

  hadleGetTasksByRange(start, end) {
    set({ isLoading: true });

    getTasksByRange(start, end)
      .then((tasks) => {
        set({ tasks });

        const { length: total } = tasks;
        const completed = tasks.filter((item: ITask) => item.completed).length;

        set({ info: { total, completed } });
      })
      .catch((error) => console.log(error))
      .finally(() => {
        set({ isLoading: false });
      });
  },

  hadleGetTasksByDateOrder(start) {
    set({ isLoading: true });

    getTasksByDateOrder(start)
      .then((tasks) => {
        set({ tasks });

        const { length: total } = tasks;
        const completed = tasks.filter((item: ITask) => item.completed).length;

        set({ info: { total, completed } });
      })
      .catch((error) => console.log(error))
      .finally(() => {
        set({ isLoading: false });
      });
  },

  hadleGetTasksByDateInvoice(start) {
    set({ isLoading: true });

    getTasksByDateInvoice(start)
      .then((tasks) => {
        set({ tasks });

        const { length: total } = tasks;
        const completed = tasks.filter((item: ITask) => item.completed).length;

        set({ info: { total, completed } });
      })
      .catch((error) => console.log(error))
      .finally(() => {
        set({ isLoading: false });
      });
  },

  hadleGetTasksByDatePayment(start) {
    set({ isLoading: true });

    getTasksByDatePayment(start)
      .then((tasks) => {
        set({ tasks });

        const { length: total } = tasks;
        const completed = tasks.filter((item: ITask) => item.completed).length;

        set({ info: { total, completed } });
      })
      .catch((error) => console.log(error))
      .finally(() => {
        set({ isLoading: false });
      });
  },

  hadleGetTasksByDateETD(start) {
    set({ isLoading: true });

    getTasksByDateETD(start)
      .then((tasks) => {
        set({ tasks });

        const { length: total } = tasks;
        const completed = tasks.filter((item: ITask) => item.completed).length;

        set({ info: { total, completed } });
      })
      .catch((error) => console.log(error))
      .finally(() => {
        set({ isLoading: false });
      });
  },

  hadleGetTasksByDateETA(start) {
    set({ isLoading: true });

    getTasksByDateETA(start)
      .then((tasks) => {
        set({ tasks });

        const { length: total } = tasks;
        const completed = tasks.filter((item: ITask) => item.completed).length;

        set({ info: { total, completed } });
      })
      .catch((error) => console.log(error))
      .finally(() => {
        set({ isLoading: false });
      });
  },

  addNewTask(newTask) {
    set({ isLoading: true });

    addTask(newTask)
      .then((data) => {
        const tasks = [...get().tasks, data];
        const { length: total } = tasks;
        const completed = tasks.filter((item) => item.completed).length;

        set({ tasks, info: { total, completed } });
      })
      .catch((error) => console.log(error))
      .finally(() => {
        set({ isLoading: false });
      });
  },

  handleUpdateTaskStatus(id, data) {
    const tasks = get().tasks.map((task) =>
      task._id === id ? { ...task, completed: data.completed } : task
    );
    const { length: total } = tasks;
    const completed = tasks.filter((item) => item.completed).length;

    set({ tasks, info: { total, completed } });
  },

  handleUpdateTaskOwner(taskId, newOwnerId, newUserId) {
    set({ isLoading: true });

    updateTaskOwner(taskId, newOwnerId, newUserId)
      .then((data) => {
        const tasks = get().tasks.map((task) =>
          task._id === taskId ? data : task
        );
        set({ tasks });
      })
      .catch((e) => console.log(e.message))
      .finally(() => {
        set({ isLoading: false });
      });
  },

  handleDeleteTask(taskId) {
    set({ isLoading: true });

    deleteTask(taskId)
      .then(() => {
        const tasks = get().tasks.filter((task) => task._id !== taskId);
        const { length: total } = tasks;
        const completed = tasks.filter((item) => item.completed).length;

        set({ tasks, info: { total, completed } });
      })
      .catch((err) => console.log(err.message))
      .finally(() => {
        set({ isLoading: false });
      });
  },

  handleUpdateTask(
    id,
    { newTask, dateOrder, dateInvoice, datePayment, dateETD, dateETA }
  ) {
    set({ isLoading: true });

    updateTask(id, {
      ...newTask,
      dateOrder,
      dateInvoice,
      datePayment,
      dateETD,
      dateETA,
    })
      .then((data) => {
        const tasks = get().tasks.map((task) =>
          task._id === id ? data : task
        );
        set({ tasks });
      })
      .catch((err) => console.log(err.message))
      .finally(() => set({ isLoading: false }));
  },

  handleFilter(query, start, end) {
    set({ isLoading: true });

    getTasksByRange(start, end)
      .then((data) => {
        const filtered = data.filter((task: ITask) =>
          task.name.toLowerCase().includes(query.toLowerCase())
        );
        set({
          tasks: filtered,
        });
      })
      .catch((error) => console.log(error))
      .finally(() => {
        set({ isLoading: false });
      });
  },
}));

export const useUserListStore = create<IUserListState>((set) => ({
  userList: [],

  getUsers() {
    getAllUsers()
      .then((data) => {
        set({ userList: data });
      })
      .catch((error) => console.log(error));
  },
}));

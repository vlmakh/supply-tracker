import axios from 'axios';
import toast from 'react-hot-toast';
import { formatDateCut } from './formatDate';

axios.defaults.baseURL = process.env.REACT_APP_MAIN_URL;
axios.defaults.withCredentials = true;

axios.interceptors.request.use(config => {
  config.headers.Authorization = `Bearer ${JSON.parse(
    localStorage.getItem('splmgr')
  )}`;

  return config;
});

axios.interceptors.response.use(
  config => {
    return config;
  },

  async error => {
    const originalRequest = error.config;

    if (
      error.response.status === 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true;

      try {
        const res = await axios.get(`api/users/refresh`);

        localStorage.setItem('splmgr', JSON.stringify(res.data.token));

        return axios.request(originalRequest);
      } catch (error) {
        toast.error(error.message);
      }
    }

    throw error;
  }
);

const errorMsg = "Something's wrong. Please refresh page and try again";

export const signup = async credentials => {
  try {
    const response = await axios.post(`api/users/signup`, credentials);

    toast.success('New user was registered successfully');

    return response.data;
  } catch (error) {
    toast.error('Probably such email was alredy registered');
  }
};

export const login = async credentials => {
  try {
    const response = await axios.post(`api/users/login`, credentials);

    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
};

export const checkCurrentUser = async () => {
  const response = await axios.get(`api/users/current`);
  return response.data;
};

export const logout = async () => {
  try {
    await axios.get(`api/users/logout`);
  } catch (error) {
    toast.error(error.message);
  }
};

export const updateUserName = async ({ name }) => {
  try {
    const response = await axios.post(`api/users/updateName`, { name });

    toast.success(() => (
      <span>
        Name <b>{name}</b> was updated
      </span>
    ));

    return response.data;
  } catch (error) {
    toast.error(errorMsg);
  }
};

export const updateUserPass = async ({ password }) => {
  try {
    const response = await axios.post(`api/users/updatePass`, {
      password,
    });

    toast.success('Password was updated successfully');

    return response.data;
  } catch (error) {
    toast.error(errorMsg);
  }
};

export const getTasks = async () => {
  try {
    const response = await axios.get(`api/tasks`);

    return response.data;
  } catch (error) {
    console.log(error.message);
  }
};

export const getTasksByRange = async (startDate, endDate) => {
  try {
    const response = await axios.get(
      `api/tasks/range?startDate=${formatDateCut(
        startDate
      )}&endDate=${formatDateCut(endDate)}T23:59:59.000Z`
    );

    return response.data;
  } catch (error) {
    console.log(error.message);
  }
};

export const addTask = async newTask => {
  try {
    const response = await axios.post(`api/tasks`, newTask);

    toast.success(() => (
      <span>
        <b>{newTask.name}</b> was added
      </span>
    ));

    return response.data;
  } catch (error) {
    toast.error(error.message);
  }
};

export const deleteTask = async id => {
  try {
    const response = await axios.delete(`api/tasks/${id}`);

    toast.success('Task was deleted');

    return response.data;
  } catch (error) {
    toast.error(errorMsg);
  }
};

export const updateTask = async (taskId, taskBody) => {
  try {
    const response = await axios.put(`api/tasks/${taskId}`, taskBody);

    toast.success('Task was updated succesfully');

    return response.data;
  } catch (error) {
    toast.error(errorMsg);
  }
};

export const updateTaskStatus = async (taskId, status) => {
  try {
    const response = await axios.patch(`api/tasks/${taskId}/status`, {
      completed: !status,
    });

    return response.data;
  } catch (error) {
    toast.error(errorMsg);
  }
};

export const getUncompletedTasksByRange = async (startDate, endDate) => {
  try {
    const response = await axios.get(
      `api/tasks/uncompleted?startDate=${formatDateCut(
        startDate
      )}&endDate=${formatDateCut(endDate)}T23:59:59.000Z`
    );

    return response.data;
  } catch (error) {
    console.log(error.message);
  }
};

export const getTasksByDateOrder = async date => {
  try {
    const response = await axios.get(
      `api/tasks/dateOrder?startDate=${formatDateCut(
        date
      )}&endDate=${formatDateCut(date)}T23:59:59.000Z`
    );

    return response.data;
  } catch (error) {
    console.log(error.message);
  }
};

export const getTasksByDateInvoice = async date => {
  try {
    const response = await axios.get(
      `api/tasks/dateInvoice?startDate=${formatDateCut(
        date
      )}&endDate=${formatDateCut(date)}T23:59:59.000Z`
    );

    return response.data;
  } catch (error) {
    console.log(error.message);
  }
};

export const getTasksByDatePayment = async date => {
  try {
    const response = await axios.get(
      `api/tasks/datePayment?startDate=${formatDateCut(
        date
      )}&endDate=${formatDateCut(date)}T23:59:59.000Z`
    );

    return response.data;
  } catch (error) {
    console.log(error.message);
  }
};

export const getTasksByDateETD = async date => {
  try {
    const response = await axios.get(
      `api/tasks/dateETD?startDate=${formatDateCut(
        date
      )}&endDate=${formatDateCut(date)}T23:59:59.000Z`
    );

    return response.data;
  } catch (error) {
    console.log(error.message);
  }
};

export const getTasksByDateETA = async date => {
  try {
    const response = await axios.get(
      `api/tasks/dateETA?startDate=${formatDateCut(
        date
      )}&endDate=${formatDateCut(date)}T23:59:59.000Z`
    );

    return response.data;
  } catch (error) {
    console.log(error.message);
  }
};

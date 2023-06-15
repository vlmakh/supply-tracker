import axios from 'axios';
import toast from 'react-hot-toast';
import { formatDateRequest } from './formatDate';

axios.defaults.baseURL = process.env.REACT_APP_MAIN_URL;

const token = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = '';
  },
};

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

    token.set(response.data.token);

    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
};

export const checkCurrentUser = async savedToken => {
  if (savedToken === null) {
    return;
  }

  token.set(savedToken);

  try {
    const response = await axios.get(`api/users/current`);
    return response.data;
  } catch (error) {}
};

export const logout = async () => {
  try {
    await axios.get(`api/users/logout`);

    token.unset();
  } catch (error) {
    toast.error(error.message);
  }
};

export const updateUserName = async ({ name, email }) => {
  try {
    const response = await axios.post(`api/users/updateName`, { email, name });

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

export const updateUserPass = async ({ email, password }) => {
  try {
    const response = await axios.post(`api/users/updatePass`, {
      email,
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
      `api/tasks/range?startDate=${formatDateRequest(
        startDate
      )}&endDate=${formatDateRequest(endDate)}T23:59:59.000Z`
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

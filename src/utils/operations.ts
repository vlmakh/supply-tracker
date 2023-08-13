import axios from 'axios';
import toast from 'react-hot-toast';
import { formatDateCut } from './formatDate';
import { ICredentials, ITask } from '../components/types'

axios.defaults.baseURL = process.env.REACT_APP_MAIN_URL;
axios.defaults.withCredentials = true;

const errorMsg = "Something's wrong. Please refresh page and try again";

axios.interceptors.request.use(config => {
  const token = localStorage.getItem('splmgr');

  if (typeof token === 'string') {
    config.headers.Authorization = `Bearer ${JSON.parse(
      token
    )}`;
  }

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
        toast.error(errorMsg);
      }
    }

    throw error;
  }
);

export const signup = async (credentials: ICredentials) => {
  try {
    const response = await axios.post(`api/users/signup`, credentials);

    toast.success('New user was registered successfully');

    return response.data;
  } catch (error) {
    toast.error('Probably such email was alredy registered');
  }
};

export const login = async (credentials: ICredentials) => {
  try {
    const response = await axios.post(`api/users/login`, credentials);

    return response.data;
  } catch (error: any) {
    toast.error(error.response.data.message);
  }
};

export const checkCurrentUser = async () => {
  try {
    const response = await axios.get(`api/users/current`);
    return response.data;
  } catch (error) {
    console.log((error as Error).message);
  }
};

export const logout = async () => {
  try {
    await axios.get(`api/users/logout`);
  } catch (error) {
    toast.error((error as Error).message);
  }
};

export const updateUserName = async ({ name }: {name: string}) => {
  try {
    const response = await axios.post(`api/users/updateName`, { name });

    toast.success('User Name was updated successfully');

    return response.data;
  } catch (error) {
    toast.error(errorMsg);
  }
};

export const updateUserPass = async ({ password }: {password: string}) => {
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

export const getTasksByRange = async (startDate: string, endDate: string) => {
  try {
    const response = await axios.get(
      `api/tasks/range?startDate=${formatDateCut(
        startDate
      )}&endDate=${formatDateCut(endDate)}T23:59:59.000Z`
    );

    return response.data;
  } catch (error: any) {
    console.log(error.message);
  }
};

export const addTask = async (newTask: Partial<ITask>) => {
  try {
    const response = await axios.post(`api/tasks`, newTask);

    toast.success('New task was added successfully');

    return response.data;
  } catch (error: any) {
    toast.error(error.message);
  }
};

export const deleteTask = async (id: string) => {
  try {
    const response = await axios.delete(`api/tasks/${id}`);

    toast.success('Task was deleted');

    return response.data;
  } catch (error) {
    toast.error(errorMsg);
  }
};

export const updateTask = async (taskId: string, taskBody: ITask) => {
  try {
    const response = await axios.put(`api/tasks/${taskId}`, taskBody);

    toast.success('Task was updated succesfully');

    return response.data;
  } catch (error) {
    toast.error(errorMsg);
  }
};

export const updateTaskStatus = async (taskId: string, status: boolean) => {
  try {
    const response = await axios.patch(`api/tasks/${taskId}/status`, {
      completed: !status,
    });

    return response.data;
  } catch (error) {
    toast.error(errorMsg);
  }
};

export const updateTaskOwner = async (taskId: string, userName: string, userId: string) => {
  try {
    const response = await axios.patch(`api/tasks/${taskId}/owner`, {
      userName,
      userId,
    });

    return response.data;
  } catch (error) {
    toast.error(errorMsg);
  }
};

export const getUncompletedTasksByRange = async (startDate: string, endDate: string) => {
  try {
    const response = await axios.get(
      `api/tasks/uncompleted?startDate=${formatDateCut(
        startDate
      )}&endDate=${formatDateCut(endDate)}T23:59:59.000Z`
    );

    return response.data;
  } catch (error) {
    console.log((error as Error).message);
  }
};

export const getTasksByDateOrder = async (date: string) => {
  try {
    const response = await axios.get(
      `api/tasks/dateOrder?startDate=${formatDateCut(
        date
      )}&endDate=${formatDateCut(date)}T23:59:59.000Z`
    );

    return response.data;
  } catch (error) {
    console.log((error as Error).message);
  }
};

export const getTasksByDateInvoice = async (date: string) => {
  try {
    const response = await axios.get(
      `api/tasks/dateInvoice?startDate=${formatDateCut(
        date
      )}&endDate=${formatDateCut(date)}T23:59:59.000Z`
    );

    return response.data;
  } catch (error) {
    console.log((error as Error).message);
  }
};

export const getTasksByDatePayment = async (date: string) => {
  try {
    const response = await axios.get(
      `api/tasks/datePayment?startDate=${formatDateCut(
        date
      )}&endDate=${formatDateCut(date)}T23:59:59.000Z`
    );

    return response.data;
  } catch (error) {
    console.log((error as Error).message);
  }
};

export const getTasksByDateETD = async (date: string) => {
  try {
    const response = await axios.get(
      `api/tasks/dateETD?startDate=${formatDateCut(
        date
      )}&endDate=${formatDateCut(date)}T23:59:59.000Z`
    );

    return response.data;
  } catch (error) {
    console.log((error as Error).message);
  }
};

export const getTasksByDateETA = async (date: string) => {
  try {
    const response = await axios.get(
      `api/tasks/dateETA?startDate=${formatDateCut(
        date
      )}&endDate=${formatDateCut(date)}T23:59:59.000Z`
    );

    return response.data;
  } catch (error) {
    console.log((error as Error).message);
  }
};

export const getAllUsers = async () => {
  try {
    const response = await axios.get('api/users/users');

    return response.data;
  } catch (error) {
    console.log((error as Error).message);
  }
};

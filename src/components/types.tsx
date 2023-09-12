import { ReactNode } from "react";

export interface IUser {
  _id?: string;
  name: string;
  email: string;
  role: string;
}

export interface ICredentials {
  name?: string;
  email: string;
  password: string;
}

export interface IResetForm {
  resetForm: () => void;
}

export interface IUserState {
  user: IUser;
  currentLang: string;
  isLoading: boolean;
  signupUser: (regData: ICredentials, resetForm: () => void) => void;
  loginUser: (regData: ICredentials, resetForm: () => void) => void;
  checkUser: () => void;
  updateName: (values: { name: string }, resetForm: () => void) => void;
  updatePass: (values: { password: string }, resetForm: () => void) => void;
  resetUser: () => void;
}

export interface ITaskState {
  tasks: Array<ITask>;
  info: {
    total: number;
    completed: number;
  };
  isLoading: boolean;
  hadleGetUncompletedTasksByRange: (start: string, end: string) => void;
  hadleGetTasksByRange: (start: string, end: string) => void;
  hadleGetTasksByDateOrder: (start: string) => void;
  hadleGetTasksByDateInvoice: (start: string) => void;
  hadleGetTasksByDatePayment: (start: string) => void;
  hadleGetTasksByDateETD: (start: string) => void;
  hadleGetTasksByDateETA: (start: string) => void;
  addNewTask: (x: Partial<ITask>) => void;
  handleUpdateTaskStatus: (id: string, data: ITask) => void;
  handleUpdateTaskOwner: (
    taskId: string,
    newOwnerId: string,
    newUserId: string
  ) => void;
  handleDeleteTask: (id: string) => void;
  handleUpdateTask: (
    id: string,
    {
      newTask,
      dateOrder,
      dateInvoice,
      datePayment,
      dateETD,
      dateETA,
    }: IUpdateTask
  ) => void;
  handleFilter: (query: string, start: string, end: string) => void;
}

export interface IUserListState {
  userList: Array<IUser> | never[];
  getUsers: () => void;
}

export interface IDates {
  dateOrder: Date;
  dateInvoice: Date;
  datePayment: Date;
  dateETD: Date;
  dateETA: Date;
}

export interface IDatesNum {
  dateOrder: number;
  dateInvoice: number;
  datePayment: number;
  dateETD: number;
  dateETA: number;
}

export interface ITask {
  _id: string;
  name: string;
  qty: number;
  unit: string;
  dateOrder: number | string;
  supplier: string;
  dateInvoice: number | string;
  datePayment: number | string;
  freight: string;
  dateETD: number | string;
  dateETA: number | string;
  completed: boolean;
  comments: string;
  owner?: string;
  ownerName?: string;
}

export interface IUpdateTask {
  newTask: ITask;
  dateOrder: number;
  dateInvoice: number;
  datePayment: number;
  dateETD: number;
  dateETA: number;
}

export interface IPortalProps {
  children: ReactNode;
  onClose?: () => void;
}

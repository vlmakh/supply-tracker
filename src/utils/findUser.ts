import { IUser } from "components/types";

export const findUserName = (userId: string, userList: Array<IUser>) => {
  const userName = userList.filter((user: IUser) => user._id === userId)[0];

  return !userName ? 'unknown user' : userName.name;
};

export const findUserId = (name: string, userList: Array<IUser>) => {
  const userId = userList.filter((user: IUser) => user.name === name)[0];

  return !userId ? 'unknown user' : userId._id;
};

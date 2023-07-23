import { userList } from './userList';

export const findUserName = userId => {
  const userName = userList.filter(user => user.id === userId)[0];

  return !userName ? 'unknown user' : userName.name;
};

export const findUserId = name => {
  const userId = userList.filter(user => user.name === name)[0];

  return !userId ? 'unknown user' : userId.id;
};

import { userList } from './userList';

export const formatUser = userId => {
  const userName = userList.filter(user => user.id === userId)[0];

  return !userName ? 'unknown user' : userName.name;
};

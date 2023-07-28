export const findUserName = (userId, userList) => {
  const userName = userList.filter(user => user._id === userId)[0];

  return !userName ? 'unknown user' : userName.name;
};

export const findUserId = (name, userList) => {
  const userId = userList.filter(user => user.name === name)[0];

  return !userId ? 'unknown user' : userId.id;
};

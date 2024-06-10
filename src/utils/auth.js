// utils/auth.js

const usersKey = 'users';

export const register = (username, password) => {
  const users = JSON.parse(localStorage.getItem(usersKey)) || [];
  const userExists = users.some(user => user.username === username);

  if (userExists) {
    return false;
  }

  const newUser = { username, password };
  users.push(newUser);
  localStorage.setItem(usersKey, JSON.stringify(users));
  return true;
};

export const login = (username, password) => {
  const users = JSON.parse(localStorage.getItem(usersKey)) || [];
  const user = users.find(user => user.username === username && user.password === password);

  if (user) {
    localStorage.setItem('authenticated', 'true');
    return true;
  }

  return false;
};

export const logout = () => {
  localStorage.removeItem('authenticated');
};

export const isAuthenticated = () => {
  return localStorage.getItem('authenticated') === 'true';
};

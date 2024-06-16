// utils/auth.js

const usersKey = 'users';

export const register = (username, password) => {
  const users = JSON.parse(localStorage.getItem(usersKey)) || [];
  
  // Check if the username already exists
  const userExists = users.some(user => user.username === username);

  if (userExists) {
    return false; // Username already taken
  }

  // Create a new user object and add it to the users array
  const newUser = { username, password };
  users.push(newUser);

  // Store the updated users array back to localStorage
  localStorage.setItem(usersKey, JSON.stringify(users));

  return true; // Registration successful
};


export const login = (username, password) => {
  const users = JSON.parse(localStorage.getItem(usersKey)) || [];
  
  // Find user with matching username and password
  const user = users.find(user => user.username === username && user.password === password);

  if (user) {
    // Set authenticated state in localStorage
    localStorage.setItem('authenticated', 'true');
    localStorage.setItem("user_paper", JSON.stringify(user.username));
    return true; // Login successful
  }

  return false; // Invalid credentials
};

export const logout = () => {
  localStorage.removeItem('authenticated');
  // Redirect to the login page
  window.location.href = '/login'; 
};

export const isAuthenticated = () => {
  return localStorage.getItem('authenticated') === 'true';
};



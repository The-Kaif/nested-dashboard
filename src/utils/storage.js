// Define a function getKey that returns the key used for storing landing pages in localStorage
const getKey = () => 'landingPages';

// Retrieve all landing pages from localStorage
export const getLandingPages = () => {
  const pages = localStorage.getItem(getKey()); // Retrieve pages from localStorage using getKey()
  return pages ? JSON.parse(pages) : []; // Parse JSON data if pages exist, otherwise return an empty array
};

// Define the key used to access landing pages in localStorage
const landingPagesKey = 'landingPages';

// Retrieve a specific landing page from localStorage based on its id
export const getLandingPage = (id) => {
  const landingPages = JSON.parse(localStorage.getItem(landingPagesKey)) || []; // Retrieve landing pages array from localStorage
  return landingPages.find(page => page.id === id); // Find and return the page with matching id, or undefined if not found
};

// Create a new landing page and store it in localStorage
export const createLandingPage = (page, id) => {
  const pages = getLandingPages(); // Retrieve current list of landing pages from localStorage
  page.id = id; // Assign id to the new page object
  pages.push(page); // Add the new page to the pages array
  localStorage.setItem(getKey(), JSON.stringify(pages)); // Store updated pages array in localStorage
};

// Update an existing landing page in localStorage
export const updateLandingPage = (id, updatedPage) => {
  const landingPages = JSON.parse(localStorage.getItem(landingPagesKey)) || []; // Retrieve landing pages array from localStorage
  const pageIndex = landingPages.findIndex(page => page.id === id); // Find index of the page with matching id

  if (pageIndex !== -1) { // If page with id exists in the array
    landingPages[pageIndex] = updatedPage; // Update page at found index with updatedPage data
    localStorage.setItem(landingPagesKey, JSON.stringify(landingPages)); // Store updated landing pages array in localStorage
  }
};

// Delete a landing page from localStorage based on its id
export const deleteLandingPage = (id) => {
  let pages = getLandingPages(); // Retrieve current list of landing pages from localStorage
  pages = pages.filter((page) => page.id !== id); // Filter out the page with matching id
  localStorage.setItem(getKey(), JSON.stringify(pages)); // Store updated pages array in localStorage
};

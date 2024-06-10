const getKey = () => 'landingPages';

export const getLandingPages = () => {
  const pages = localStorage.getItem(getKey());
  return pages ? JSON.parse(pages) : [];
};

export const getLandingPage = (id) => {
  const pages = getLandingPages();
  return pages.find((page) => page.id === id);
};

export const createLandingPage = (page) => {
  const pages = getLandingPages();
  page.id = Date.now().toString();
  pages.push(page);
  localStorage.setItem(getKey(), JSON.stringify(pages));
};

export const updateLandingPage = (id, updatedPage) => {
  let pages = getLandingPages();
  pages = pages.map((page) => (page.id === id ? updatedPage : page));
  localStorage.setItem(getKey(), JSON.stringify(pages));
};

export const deleteLandingPage = (id) => {
  let pages = getLandingPages();
  pages = pages.filter((page) => page.id !== id);
  localStorage.setItem(getKey(), JSON.stringify(pages));
};

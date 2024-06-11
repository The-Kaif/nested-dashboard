const getKey = () => 'landingPages';

export const getLandingPages = () => {
  const pages = localStorage.getItem(getKey());
  return pages ? JSON.parse(pages) : [];
};

const landingPagesKey = 'landingPages';

export const getLandingPage = (id) => {
  const landingPages = JSON.parse(localStorage.getItem(landingPagesKey)) || [];
  return landingPages.find(page => page.id === id);
};

export const createLandingPage = (page) => {
  const pages = getLandingPages();
  page.id = Date.now().toString();
  pages.push(page);
  localStorage.setItem(getKey(), JSON.stringify(pages));
};

export const updateLandingPage = (id, updatedPage) => {
  const landingPages = JSON.parse(localStorage.getItem(landingPagesKey)) || [];
  const pageIndex = landingPages.findIndex(page => page.id === id);

  if (pageIndex !== -1) {
    landingPages[pageIndex] = updatedPage;
    localStorage.setItem(landingPagesKey, JSON.stringify(landingPages));
  }
};

export const deleteLandingPage = (id) => {
  let pages = getLandingPages();
  pages = pages.filter((page) => page.id !== id);
  localStorage.setItem(getKey(), JSON.stringify(pages));
};

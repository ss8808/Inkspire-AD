export const getUserIdFromToken = () => {
  return sessionStorage.getItem('userId'); // fallback storage
};

export const getToken = () => {
  return sessionStorage.getItem('authToken');
};

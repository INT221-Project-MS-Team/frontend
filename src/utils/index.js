export const getCurrentDateTime = () => {
  return new Date().toISOString().substr(0, 10).split('-').reverse().join('/');
};

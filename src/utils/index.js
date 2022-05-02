export const getCurrentDateTime = () => {
  return new Date().toISOString();
};

export const convertDateFormat = (date) => {
  return date.split('/').reverse().join('-');
};

export const getDate = (eventStartTime) => {
  let date = new Date(eventStartTime);
  return date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear();
};

export const getTime = (eventStartTime) => {
  let date = new Date(eventStartTime);
  return date.getHours() + ':' + date.getMinutes();
};

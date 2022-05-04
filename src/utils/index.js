export const getCurrentDateTime = () => {
  return new Date().toISOString();
};

export const convertDateFormat = (date) => {
  return date.split('/').reverse().join('-');
};

export const getDate = (eventStartTime) => {
  let date = new Date(eventStartTime);
  return date.toLocaleDateString();
};

export const getTime = (eventStartTime) => {
  let date = new Date(eventStartTime);
  return date.toLocaleTimeString();
};

export const convertDateTimeToISOString = (date, time) => {
  let dateTime = new Date(date + ' ' + time);
  return dateTime.toISOString();
};

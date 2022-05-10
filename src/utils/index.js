export const getCurrentDateTime = () => {
  return new Date().toISOString();
};

export const convertDateFormat = (date) => {
  return date.split('-').reverse().join('/');
};

export const getDate = (eventStartTime) => {
  let date = new Date(eventStartTime);
  return date.toLocaleDateString('en-GB');
};

export const getTime = (eventStartTime) => {
  let date = new Date(eventStartTime);
  let option = { hour: '2-digit', minute: '2-digit' };
  return date.toLocaleTimeString('en-GB', option);
};

export const convertDateTimeToISOString = (date, time) => {
  let dateTime = new Date(date + ' ' + time);
  return dateTime.toISOString();
};

export const categoryIdToBadgeColor = (categoryId) => {
  let colors = [
    'primary',
    'yellow',
    'pink',
    'purple',
    'red',
    'indego',
    'green',
    'dark',
  ];
  return categoryId - 1 > colors.length ? 'primary' : colors[categoryId - 1];
};

export const truncateString = (string, length = 50) => {
  if (string.length > length) {
    return string.substring(0, length) + '...';
  }
  return string;
};

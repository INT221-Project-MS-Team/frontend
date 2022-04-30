export const getCurrentDateTime = () => {
  return new Date().toISOString().substr(0, 10).split('-').reverse().join('/');
};
export const convertToISO = (date) => {
  return date.split('/').reverse().join('-');
}

export const getDate = (eventStartTime) => {
  return new Date(eventStartTime)
    .toString()
    .split('GMT')[0]
    .trim()
    .split(' ')
    .slice(0, 4)
    .join(' ');
};

export const getTime = (eventStartTime) => {
  return new Date(eventStartTime)
    .toString()
    .split('GMT')[0]
    .trim()
    .split(' ')
    .slice(4)
    .join(' ');
};

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

export const validateFutureTime = (eventStartTime) => {
  let date = new Date(eventStartTime);
  let currentDate = new Date();
  return date > currentDate;
};

export const validateEmail = (email) => {
  return (
    String(email)
      .toLowerCase()
      .match(/^(.+)@(\S+).(\S+)$/) !== null
  );
};

export const isOverlapTime = (insertEvent, allEvents) => {
  let isOverlap = false;
  let insertEventStart = new Date(insertEvent.eventStartTime);
  let insertEventEnd = new Date(insertEvent.eventStartTime);
  let insertEventId = insertEvent?.id ? insertEvent.id : -1;
  insertEventEnd.setMinutes(
    insertEventEnd.getMinutes() + insertEvent.eventDuration
  );
  allEvents
    .filter(
      (event) =>
        event.eventCategory.id === insertEvent.eventCategoryId &&
        event.id !== insertEventId
    )
    .forEach((event) => {
      let eventDateStart = new Date(event.eventStartTime);
      let eventDateEnd = new Date(event.eventStartTime);
      eventDateEnd.setMinutes(eventDateEnd.getMinutes() + event.eventDuration);
      if (
        eventDateStart <= insertEventEnd &&
        eventDateEnd >= insertEventStart
      ) {
        isOverlap = true;
      }
    });
  return isOverlap;
};

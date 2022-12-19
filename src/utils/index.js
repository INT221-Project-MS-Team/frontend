export const getCurrentDateTime = () => {
  return new Date();
};

export const getDate = (datetime) => {
  let date = new Date(datetime);
  return date.toLocaleDateString('en-GB');
};

export const getTime = (datetime) => {
  let date = new Date(datetime);
  let option = { hour: '2-digit', minute: '2-digit' };
  return date.toLocaleTimeString('en-GB', option);
};

export const getInputDate = (datetime) => {
  let date = new Date(datetime);
  return (
    date.getFullYear() +
    '-' +
    ('0' + (date.getMonth() + 1)).slice(-2) +
    '-' +
    ('0' + date.getDate()).slice(-2)
  );
};

export const getInputTime = (datetime) => {
  let date = new Date(datetime);
  return (
    ('0' + date.getHours()).slice(-2) +
    ':' +
    ('0' + date.getMinutes()).slice(-2)
  );
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

export const categoryIdToStyleColor = (categoryId) => {
  let colors = [
    ['bg-blue-100', 'text-blue-800'],
    ['bg-yellow-100', 'text-yellow-800'],
    ['bg-pink-100', 'text-pink-800'],
    ['bg-purple-100', 'text-purple-800'],
    ['bg-red-100', 'text-red-800'],
    ['bg-indigo-100', 'text-indigo-800'],
    ['bg-green-100', 'text-green-800'],
    ['bg-gray-100', 'text-gray-800'],
  ];
  return categoryId - 1 > colors.length ? 'primary' : colors[categoryId - 1];
};

export const truncateString = (string = '', length = 50) => {
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
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      ) !== null
  );
};

export const isOverlapTime = (insertEvent, allEvents) => {
  let result = false;
  let insertEventStart = new Date(insertEvent.eventStartTime);
  let insertEventEnd = new Date(insertEvent.eventStartTime);
  let insertEventId = insertEvent?.id ? insertEvent.id : -1;
  console.log(insertEventId);
  insertEventEnd.setMinutes(
    insertEventEnd.getMinutes() + insertEvent.eventDuration
  );
  allEvents
    .filter(
      (event) =>
        event.eventCategory.id == insertEvent.eventCategoryId &&
        event.id != insertEventId
    )
    .forEach((event) => {
      console.log(event);
      let eventDateStart = new Date(event.eventStartTime);
      let eventDateEnd = new Date(event.eventStartTime);
      eventDateEnd.setMinutes(eventDateEnd.getMinutes() + event.eventDuration);
      if (
        isOverlap(
          eventDateStart,
          eventDateEnd,
          insertEventStart,
          insertEventEnd
        )
      ) {
        result = true;
      }
    });
  return result;
};

export const isOverlap = (a_start, a_end, b_start, b_end) => {
  // b start in a
  if (a_start <= b_start && b_start <= a_end) return true;
  // b end in a
  if (a_start <= b_end && b_end <= a_end) return true;
  // b in a
  if (a_start <= b_start && b_end <= a_end) return true;
  // b over a
  if (b_start <= a_start && b_end >= a_end) return true;
  // b start before a
  if (b_start <= a_start && b_end >= a_start) return true;
  return false;
};

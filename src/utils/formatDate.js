import { format } from 'date-fns';

export const formatDate = date => {
  if (date) {
    return format(Date.parse(date), 'dd.MM.yyyy');
  }
};

// export const formatDateUTC = date => {
//   // const dateTime = '2022-07-27T08:36:12';

//   if (date) {
//     const result = date.split('T')[0].split('-').reverse().join('.');

//     return result;
//   }
// };

export const formatDateCut = date => {
  if (date) {
    return format(Date.parse(date), 'yyyy-MM-dd');
  }
};

export const formatDateMS = date => {
  if (date) {
    return format(Date.parse(date), 'T');
  }

  return Math.round(date);
};

export const formatDateDays = date => {
  if (date < 0 || !date) {
    return 0;
  }

  return Math.round(date / 86_400_000);
};

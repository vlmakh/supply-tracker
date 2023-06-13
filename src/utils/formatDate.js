import { format } from 'date-fns';

export const formatDate = date => {
  if (date) {
    return format(Date.parse(date), 'dd.MM.yyyy');
  }
};

export const formatDateUTC = date => {
  // const dateTime = '2022-07-27T08:36:12';

  if (date) {
    const result = date.split('T')[0].split('-').reverse().join('.');

    // console.log(result);
    return result;
  }
};

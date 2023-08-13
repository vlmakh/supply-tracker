import { format } from 'date-fns';

// in TaskItem
export const formatDate = (date: string) => {
  if (date) {
    return format(Date.parse(date), 'dd.MM.yyyy');
  }
};

// in operations
export const formatDateCut = (date: string) => {
  if (date) {
    return format(Date.parse(date), 'yyyy-MM-dd');
  }
};

// in TaskItem
export const formatDateMS = (date: string) => {
  if (date) {
    return format(Date.parse(date), 'T');
  }

  return Math.round(+date);
};

// in TaskItem
export const formatDateDays = (date: number) => {
  if (date < 0 || !date) {
    return 0;
  }

  return Math.round(date / 86_400_000);
};

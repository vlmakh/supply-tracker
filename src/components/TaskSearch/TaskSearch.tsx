import { useParams } from 'react-router-dom';
import { Label, Input, ClearBtn } from './TaskSearch.styled';
import { BsSearch } from 'react-icons/bs';
import { FC, useState } from 'react';
import { IoIosCloseCircle } from 'react-icons/io';
import { useTaskStore } from 'utils/store';
import { ChangeEventHandler } from 'react';

type Props = {
  startDate: Date; endDate: Date; today: Date;}

export const TaskSearch: FC<Props> = ({ startDate, endDate, today }) => {
  const [query, setQuery] = useState('');
  const {
    handleFilter,
    hadleGetTasksByRange,
    hadleGetUncompletedTasksByRange,
    hadleGetTasksByDateOrder,
    hadleGetTasksByDateInvoice,
    hadleGetTasksByDatePayment,
    hadleGetTasksByDateETD,
    hadleGetTasksByDateETA,
  } = useTaskStore(state => state);

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = e => {
    setQuery(e.target.value);

    handleFilter(e.target.value, startDate.toString(), endDate.toString());
  };

  const { category } = useParams();

  const clearInput = (value: string | undefined) => {
    if (!query) {
      return;
    }

    setQuery('');

    switch (value) {
      case 'range':
        hadleGetTasksByRange(startDate.toString(), endDate.toString());
        break;
      case 'uncompleted':
        hadleGetUncompletedTasksByRange(startDate.toString(), endDate.toString());
        break;
      case 'today-order':
        hadleGetTasksByDateOrder(today.toString());
        break;
      case 'today-invoice':
        hadleGetTasksByDateInvoice(today.toString());
        break;
      case 'today-payment':
        hadleGetTasksByDatePayment(today.toString());
        break;
      case 'today-etd':
        hadleGetTasksByDateETD(today.toString());
        break;
      case 'today-eta':
        hadleGetTasksByDateETA(today.toString());
        break;
      default:
        return;
    }
  };

  return (
    <form>
      <Label>
        <BsSearch size="24" />

        <Input
          onChange={handleInputChange}
          value={query}
          name="query"
          debounceTimeout={500}
        />

        <ClearBtn type="button" onClick={() => clearInput(category)}>
          <IoIosCloseCircle size="20" />
        </ClearBtn>
      </Label>
    </form>
  );
};

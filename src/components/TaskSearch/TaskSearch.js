import { useParams } from 'react-router-dom';
import { Label, Input, ClearBtn } from './TaskSearch.styled';
import { BsSearch } from 'react-icons/bs';
import { useState } from 'react';
import { IoIosCloseCircle } from 'react-icons/io';
import { useTaskStore } from 'utils/store';

export const TaskSearch = ({ startDate, endDate, today }) => {
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

  const handleInputChange = e => {
    setQuery(e.target.value);

    handleFilter(e.target.value, startDate, endDate);
  };

  const { category } = useParams();

  const clearInput = value => {
    if (!query) {
      return;
    }

    setQuery('');

    switch (value) {
      case 'range':
        hadleGetTasksByRange(startDate, endDate);
        break;
      case 'uncompleted':
        hadleGetUncompletedTasksByRange(startDate, endDate);
        break;
      case 'today-order':
        hadleGetTasksByDateOrder(today);
        break;
      case 'today-invoice':
        hadleGetTasksByDateInvoice(today);
        break;
      case 'today-payment':
        hadleGetTasksByDatePayment(today);
        break;
      case 'today-etd':
        hadleGetTasksByDateETD(today);
        break;
      case 'today-eta':
        hadleGetTasksByDateETA(today);
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

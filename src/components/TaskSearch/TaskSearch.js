import { Label, Input, ClearBtn } from './TaskSearch.styled';
import { BsSearch } from 'react-icons/bs';
import { useState } from 'react';
import { IoIosCloseCircle } from 'react-icons/io';
import { useTaskStore } from 'utils/store';

export const TaskSearch = ({ startDate, endDate }) => {
  const [query, setQuery] = useState('');
  const { handleFilter, hadleGetTasksByRange } = useTaskStore(state => state);

  const handleInputChange = e => {
    setQuery(e.target.value);

    handleFilter(e.target.value, startDate, endDate);
  };

  const clearInput = () => {
    if (!query) {
      return;
    }

    setQuery('');

    hadleGetTasksByRange(startDate, endDate);
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

        <ClearBtn type="button" onClick={clearInput}>
          <IoIosCloseCircle size="20" />
        </ClearBtn>
      </Label>
    </form>
  );
};

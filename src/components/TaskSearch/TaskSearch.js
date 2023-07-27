import { Label, Input, ClearBtn } from './TaskSearch.styled';
import { BsSearch } from 'react-icons/bs';
import { useState, useContext } from 'react';
import { TaskContext } from 'utils/context';
import { getTasksByRange } from 'utils/operations';
import { IoIosCloseCircle } from 'react-icons/io';

export const TaskSearch = ({ startDate, endDate }) => {
  const [query, setQuery] = useState('');
  const { dispatch } = useContext(TaskContext);

  const handleInputChange = e => {
    setQuery(e.target.value);

    getTasksByRange(startDate, endDate)
      .then(tasks => dispatch({ type: 'filter', tasks, query: e.target.value }))
      .catch(error => {});
  };

  const clearInput = () => {
    if (!query) {
      return;
    }

    setQuery('');

    getTasksByRange(startDate, endDate)
      .then(tasks => dispatch({ type: 'getTasks', tasks }))
      .catch(error => {});
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

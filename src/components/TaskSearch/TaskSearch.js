import { StyledForm, Label, Input } from './TaskSearch.styled';
import { BsSearch } from 'react-icons/bs';
import { useState, useContext } from 'react';
import { TaskContext } from 'utils/context';
import { getTasksByRange } from 'utils/operations';
// import { debounce } from 'debounce';

export const TaskSearch = ({ startDate, endDate }) => {
  const [query, setQuery] = useState('');
  const { dispatch, setIsLoading } = useContext(TaskContext);

  const handleInputChange = e => {
    setQuery(e.target.value);

    getTasksByRange(startDate, endDate)
      .then(tasks => dispatch({ type: 'filter', tasks, query: e.target.value }))
      .catch(error => {})
      .finally(() => {
        setIsLoading(false);
      });

    console.log(e.target.value);
  };

  return (
    <>
      <StyledForm>
        <Label>
          <BsSearch size="24" />

          <Input onChange={handleInputChange} value={query} name="query" />
        </Label>
      </StyledForm>
    </>
  );
};

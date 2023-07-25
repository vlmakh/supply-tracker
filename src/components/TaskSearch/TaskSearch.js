import { StyledForm, Label, Input } from './TaskSearch.styled';
import { BsSearch } from 'react-icons/bs';
import { useState } from 'react';
// import { debounce } from 'debounce';

export const TaskSearch = () => {
  const [query, setQuery] = useState('');

  const handleInputChange = e => {
    setQuery(e.target.value);

    console.log(query);
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

import styled from '@emotion/styled';

export const StyledForm = styled.form`
  /* display: flex;
  gap: 8px;
  align-items: center; */
`;

export const Label = styled.label`
  display: flex;
  gap: 8px;
  align-items: center;
  position: relative;

  :hover button {
    color: grey;
  }
`;

export const Input = styled.input`
  padding: 4px 8px;
  border-radius: 4px;

  :focus-visible {
    outline: none;
  }

  :hover,
  :focus {
    border: 2px solid ${p => p.theme.colors.accent};
  }
`;

export const ClearBtn = styled.button`
  position: absolute;
  padding: 0 4px;
  top: 4px;
  right: 0;
  border: none;
  color: transparent;
  background-color: transparent;

  cursor: pointer;

  transition: color 250ms linear;
`;

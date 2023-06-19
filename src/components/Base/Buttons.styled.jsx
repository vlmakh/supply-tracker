import styled from '@emotion/styled';

export const TDButton = styled.button`
  border: none;
  background-color: transparent;
  padding: 0;
  width: 100%;
  text-align: left;
  cursor: ${p => !p.disabled && 'pointer'};
  transition: all 250ms ease-in;
`;

export const AddTaskButton = styled.button`
  position: fixed;
  right: 32px;
  bottom: 40px;

  display: grid;
  place-content: center;
  color: white;
  font-weight: 700;
  cursor: pointer;
  padding: 8px;
  border: none;
  border-radius: 50%;
  background-color: #004200;

  transition: background-color 250ms ease-in;

  &:hover {
    background-color: green;
  }
`;

export const AddTaskFormButton = styled.button`
  width: 50%;
  font-weight: 700;
  cursor: pointer;
  margin-top: 16px;
  padding: 4px;
  border-radius: 4px;
  background-color: #004200;
  color: white;

  transition: background-color 250ms ease-in;

  &:hover {
    background-color: green;
  }
`;

export const CloseButton = styled.button`
  display: block;
  border: none;
  background-color: transparent;
  padding: 0;
  cursor: pointer;
  margin-left: auto;

  transition: color 250ms ease-in;

  &:hover {
    color: green;
  }
`;



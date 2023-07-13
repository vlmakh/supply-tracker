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

export const Button = styled.button`
  color: white;
  font-weight: 700;
  cursor: ${p => !p.disabled && 'pointer'};
  padding: 8px;
  border: none;
  background-color: ${p => p.theme.colors.accent};
  transition: background-color 250ms ease-in;

  &:hover {
    background-color: green;
  }
`;

export const AddTaskButton = styled(Button)`
  display: grid;
  place-content: center;
  position: fixed;
  right: 32px;
  bottom: 40px;
  border-radius: 50%;
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

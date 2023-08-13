import styled from "@emotion/styled";

export const TDButton = styled.button`
  border: none;
  background-color: transparent;
  padding: 0;
  width: 100%;
  text-align: left;
  cursor: ${(p: { disabled: boolean; }) => !p.disabled && "pointer"};
  transition: all 250ms ease-in;
`;

export const Button = styled.button`
  font-weight: 700;
  cursor: ${(p: { disabled: boolean; }) => !p.disabled && "pointer"};
  padding: 8px;
  border: 2px solid ${(p: { theme: { colors: { accent: string; }; }; }) => p.theme.colors.accent};
  background-color: ${(p: { theme: { colors: { accent: string; }; }; }) =>
    p.theme.colors.accent};
  color: white;
  transition: background-color 250ms ease-in;

  &:hover {
    background-color: white;
    color: ${(p: { theme: { colors: { accent: string; }; }; }) => p.theme.colors.accent};
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

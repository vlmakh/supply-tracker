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

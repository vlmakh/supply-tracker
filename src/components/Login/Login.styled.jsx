import styled from '@emotion/styled';
import { Form, Field, ErrorMessage } from 'formik';
import { NavLink } from 'react-router-dom';
import { Button } from 'components/Base/Buttons.styled';

export const FormWrap = styled.div`
  width: 100%;
  margin: 40px auto 0;
`;

export const GreenLine = styled.div`
  padding: 16px 0;
  margin-bottom: 40px;
  background-color: lightgreen;
`;

export const FormBox = styled.div`
  width: 360px;
  margin: 16px auto;
  background-color: white;
  overflow: hidden;
`;

export const StyledForm = styled(Form)`
  padding: 16px 24px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

export const FormTitle = styled.h2`
  margin-bottom: 16px;
`;

export const TextLink = styled(NavLink)`
  text-align: right;
  width: 100%;
  color: ${p => p.theme.colors.bcgSec};
  text-decoration: none;
  transition: color 250ms linear;

  &.active {
    color: ${p => p.theme.colors.textPrim};
  }

  :hover {
    color: ${p => p.theme.colors.textPrim};
  }
`;

export const StyledField = styled(Field)`
  padding: 8px 4px;
  width: 100%;
  border-radius: 4px;
  transition: border 250ms linear;

  :focus-visible {
    outline: none;
  }

  :hover, :focus {
    border: 2px solid green;
  }
`;

export const Label = styled.label`
  position: relative;
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
  margin-bottom: 16px;
`;

export const StyledErrorMsg = styled(ErrorMessage)`
  position: absolute;
  bottom: 0;
  right: 0;
  transform: translatey(100%);
  font-size: 10px;
  background-color: white;
  color: ${p => p.theme.colors.textPrim};
`;

export const LoginButton = styled(Button)`
  display: flex;
  justify-content: center;
  width: 100%;
  border-radius: 4px;
  margin: 0 auto 16px;
  background-color: ${p => p.disabled && 'grey'};

  &:hover {
    background-color: ${p => p.disabled && 'grey'};
  }
`;

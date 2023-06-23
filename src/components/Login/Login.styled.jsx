import styled from '@emotion/styled';
import { Form, Field, ErrorMessage } from 'formik';
import { NavLink } from 'react-router-dom';
import { Button } from 'components/Base/Buttons.styled';

export const HomeBox = styled.div`  
    width: 400px;
    margin: 40px auto 0;  
`;

export const ImgBox = styled.div`
  width: 80px;
  margin: 0 auto;
  
`;

export const FormBox = styled.div`
  width: 360px;
  height: 300px;
  margin: 16px auto;
  background-color: white;
  border: ${p => p.theme.borders.dark};
  border-radius: ${p => p.theme.radii.normal};
  box-shadow: ${p => p.theme.shadows.box};
  overflow: hidden;
`;

export const LinkBox = styled.div`
  display: flex;
  justify-content: space-around;
  text-align: center;
`;

export const MenuLink = styled(NavLink)`
  width: 50%;
  padding: 16px 0;
  font-size: 16px;
  font-weight: 700;
  color: white;
  border-bottom: ${p => p.theme.borders.dark};
  text-decoration: none;
  transition: background-color 250ms linear;
  background-color: ${p => p.theme.colors.accent};

  &.active {
    background-color: ${p => p.theme.colors.second};
  }

  :hover {
    background-color: ${p => p.theme.colors.accent};
  }
`;

export const StyledForm = styled(Form)`
  padding: 16px 24px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 248px;
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
  padding: 4px 8px;

  :focus-visible {
    outline: none;
  }
`;

export const Label = styled.label`
  position: relative;
  display: flex;
  justify-content: space-between;
  font-weight: 600;
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
  width: 100%;
  border-radius: 4px;
  margin: 0 auto; 
  background-color: ${p => p.disabled && 'grey'};

   &:hover {
    background-color: ${p => p.disabled && 'grey'};
  }
`;

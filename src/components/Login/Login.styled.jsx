import styled from '@emotion/styled';
import { Form, Field, ErrorMessage } from 'formik';
import { NavLink } from 'react-router-dom';

export const HomeBox = styled('div')`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
  height: 300px;

  @media screen and (min-width: 768px) {
    width: 720px;
    display: flex;
    justify-content: space-between;
  }
`;

export const ImgBox = styled.div`
  width: 300px;

  @media screen and (max-width: 767.98px) {
    display: none;
  }
`;

export const FormBox = styled.div`
  width: 360px;
  height: 300px;
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
  color: #212121;
  border-bottom: ${p => p.theme.borders.dark};
  text-decoration: none;
  transition: background-color 250ms linear;

  &.active {
    background-color: ${p => p.theme.colors.bcgLink};
  }

  :hover {
    background-color: ${p => p.theme.colors.bcgSec};
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

export const Button = styled.button`
  cursor: pointer;
  width: 100%;
  padding: 8px;
  font-size: 16px;
  font-weight: 600;
  border-radius: 4px;
  border: none;
  margin: 0 auto;
  background-color: darkgrey;
  transition: background-color 250ms linear;

  :hover,
  :focus {
    background-color: ${p => (p.disabled ? 'darkgrey': 'grey')};
  }

  :focus-visible {
    outline: none;
  }
`;

import styled from '@emotion/styled';
import { Field } from 'formik';
import { NavLink } from 'react-router-dom';

export const StyledLinkBtn = styled(NavLink)`
  margin-left: 16px;
  color: ${p => p.theme.colors.main};
  transition: color 250ms ease-in;

  &.active {
    color: ${p => p.theme.colors.accent};
  }

  :hover,
  :focus {
    color: ${p => p.theme.colors.accent};
  }
`;

export const MenuField = styled(Field)`
    margin-left: 8px;
    visibility: hidden;
    height: 0px;
    width: 0px;

  &:checked + svg {
    color: green;
  }
`;

export const Label = styled.label`
  cursor: pointer;
  padding: 4px 8px 4px 4px;
  transition: color 250ms ease-in;

  &:hover {
    color: green;
  }
`;

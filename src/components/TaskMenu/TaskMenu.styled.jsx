import styled from '@emotion/styled';
import { Form, Field } from 'formik';

export const FormMenu = styled(Form)`
  display: flex;
  /* margin-left: 32px;

  @media screen and (max-width: 767px) {
    margin-left: 8px;
  } */
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

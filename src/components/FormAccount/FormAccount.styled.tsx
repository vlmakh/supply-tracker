import styled from "@emotion/styled";
import { Form, Field, ErrorMessage } from "formik";
import { Button } from "components/Base/Buttons.styled";
import { NavLink } from "react-router-dom";

export const FormStyled = styled(Form)`
  text-align: center;
  width: 100%;
  padding: 16px 16px 32px;
  border-top: 1px solid lightgray;
  background-color: white;

  @media screen and (max-width: 499px) {
    width: 100vw;
  }

  @media screen and (min-width: 500px) {
    width: 500px;
  }
`;

export const FormTitle = styled.h4`
  text-align: left;
  font-size: 16px;
  font-weight: 700;
`;

export const FieldName = styled.span`
  width: 80px;
  text-align: right;
  margin-right: 16px;
`;

export const Label = styled.label`
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
  margin-top: 16px;
`;

export const Input = styled(Field)`
  padding: 4px;
  width: 60%;
  &:focus-visible {
    outline: 1px solid green;
  }
`;

export const FormButton = styled(Button)`
  border-radius: 4px;
  margin-left: 16px;
  width: 100px;
  background-color: ${(p: { disabled: boolean; }) => p.disabled && "grey"};
`;

export const ErrorStyled = styled(ErrorMessage)`
  position: absolute;
  left: 100px;
  bottom: 0;
  transform: translatey(100%);

  font-size: 10px;
  background-color: white;
  color: #212121;
`;

export const BackLink = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 16px 16px 32px;
  text-decoration: none;
  color: #004200;

  transition: color 250ms ease-in;

  &:hover {
    color: green;
  }
`;

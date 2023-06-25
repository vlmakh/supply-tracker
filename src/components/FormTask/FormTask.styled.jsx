import styled from '@emotion/styled';
import { Form, Field, ErrorMessage } from 'formik';
import DatePicker from 'react-datepicker';
import { Button } from 'components/Base/Buttons.styled';

export const FormStyled = styled(Form)`
  text-align: center;
  width: 100%;
  padding: 16px 16px 32px;
  border: 1px solid #212121;
  border-radius: 4px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.8);
  background-color: white;

  @media screen and (max-width: 499px) {
    width: 100vw;
  }

  @media screen and (min-width: 500px) {
    width: 500px;
  }
`;

export const FormTitle = styled.p`
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 16px;
`;

export const FieldName = styled.span`
  width: 108px;
  text-align: right;
  margin-right: 16px;
`;

export const FormField = styled.div`
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

export const Qty = styled(Field)`
  padding: 4px;
  width: 40%;
  &:focus-visible {
    outline: 1px solid green;
  }
`;

export const Unit = styled(Field)`
  padding: 4px;
  width: 20%;
  &:focus-visible {
    outline: 1px solid green;
  }
`;

export const DateInput = styled(Field)`
  padding: 4px;
  width: 100px;
`;

export const DatePickerStyled = styled(DatePicker)`
  padding: 4px;
  width: 80px;
  &:focus-visible {
    outline: 1px solid green;
  }
`;

export const Comments = styled(Field)`
  padding: 4px;
  width: 60%;
  resize: none;
  &:focus-visible {
    outline: 1px solid green;
  }
`;

export const FormBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  padding: 0;
  border: none;
  background-color: transparent;
  border-radius: 50%;
  cursor: pointer;
  font-weight: 700;

  transition: color 250ms linear, background-color 250ms linear;

  :hover {
    background-color: #ffcc00;
    color: white;
  }
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

export const AddTaskFormButton = styled(Button)`
  width: 50%;
  margin: 16px auto 0;
  border-radius: 4px;
`;

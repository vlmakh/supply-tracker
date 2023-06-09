import styled from '@emotion/styled';
import { Form, Field, ErrorMessage } from 'formik';

export const FormStyled = styled(Form)`
position: absolute;
top: 20%;
left: 40%;
  text-align: center;
  width: 100%;
  padding: 16px 16px 32px;
  border: 1px solid #212121;
  border-radius: 4px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.8);
  background-color: white;

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
  width: 80px;
  text-align: right;
  margin-right: 16px;
`

export const FormField = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;

  &:not(:first-of-type) {
    margin-top: 16px;
  }
`;

export const Input = styled(Field)`
  padding: 4px;
  width: 60%;
`;

export const Comments = styled(Field)`
  padding: 4px;
  width: 60%;
  resize: none;
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
  bottom: 0;
  transform: translatey(100%);

  font-size: 10px;
  background-color: white;
  color: #212121;
`;
import styled from '@emotion/styled';
import { Form, Field, ErrorMessage } from 'formik';

export const FormStyled = styled(Form)`
  text-align: center;
  width: 100%;
  padding: 16px 16px 32px;
  border-bottom: 1px solid lightgray;
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
  width: 80px;
  text-align: right;
  margin-right: 16px;
 
`

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
export const ErrorStyled = styled(ErrorMessage)`
  position: absolute;
  left: 100px;
  bottom: 0;
  transform: translatey(100%);

  font-size: 10px;
  background-color: white;
  color: #212121;
`;

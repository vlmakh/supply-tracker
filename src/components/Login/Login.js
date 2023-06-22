import {
  StyledForm,
  StyledField,
  Label,
  StyledErrorMsg,
  LoginButton,
} from './Login.styled';
import { Formik } from 'formik';
import { login } from 'utils/operations';
import * as yup from 'yup';
import { useState } from 'react';

let schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
});

export default function Login({ setUser, setToken, setIsLoggedIn }) {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = (values, { resetForm }) => {
    setIsProcessing(true);

    login(values)
      .then(data => {
        resetForm();
        setToken(data.token);
        setUser(data.user.name);
        setIsLoggedIn(true);
      })
      .catch(error => {})
      .finally(() => {
        setIsProcessing(false);
      });
  };

  return (
    <Formik
      onSubmit={handleSubmit}
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={schema}
    >
      <StyledForm>
        <Label htmlFor="email">
          <span>email</span>
          <StyledField name="email" type="text" placeholder=" "></StyledField>
          <StyledErrorMsg component="div" name="email" />
        </Label>

        <Label htmlFor="password">
          <span>password </span>
          <StyledField
            name="password"
            type="password"
            placeholder=" "
            autoComplete="off"
          ></StyledField>
          <StyledErrorMsg component="div" name="password" />
        </Label>

        <LoginButton type="submit" disabled={isProcessing}>
          {isProcessing ? 'Please wait...' : 'Login'}
        </LoginButton>
      </StyledForm>
    </Formik>
  );
}

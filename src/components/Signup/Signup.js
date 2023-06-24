import {
  LoginButton,
  StyledForm,
  StyledField,
  Label,
  StyledErrorMsg,
} from 'components/Login/Login.styled';
import { Formik } from 'formik';
import * as yup from 'yup';
import { signup } from 'utils/operations';
import { useState } from 'react';
import { LoginLoader } from 'components/Loader/LoginLoader';

let schema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
});

export default function Signup() {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = (values, { resetForm }) => {
    const { name, email, password } = values;
    const regData = { name, email, password };
    setIsProcessing(true);

    signup(regData)
      .then(() => {
        resetForm();
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
        name: '',
        email: '',
        password: '',
        passwordConfirm: '',
      }}
      validationSchema={schema}
    >
      <StyledForm>
        <Label htmlFor="email">
          <span>email</span>
          <StyledField name="email" type="email" placeholder=" "></StyledField>
          <StyledErrorMsg component="div" name="email" />
        </Label>

        <Label htmlFor="name">
          <span>name</span>
          <StyledField name="name" type="text" placeholder=" "></StyledField>
          <StyledErrorMsg component="div" name="name" />
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

        <Label htmlFor="passwordConfirm">
          <span>re-password </span>
          <StyledField
            name="passwordConfirm"
            type="password"
            placeholder=" "
            autoComplete="off"
          ></StyledField>
          <StyledErrorMsg component="div" name="passwordConfirm" />
        </Label>

        <LoginButton type="submit" disabled={isProcessing}>
          {isProcessing ? 'Please wait...' : 'Register'}{' '}
          <LoginLoader isProcessing={isProcessing} />
        </LoginButton>
      </StyledForm>
    </Formik>
  );
}

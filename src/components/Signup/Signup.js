import {
  LoginButton,
  StyledForm,
  FormTitle,
  StyledField,
  Label,
  StyledErrorMsg,
  TextLink,
} from 'components/Login/Login.styled';
import { Formik } from 'formik';
import * as yup from 'yup';
import { signup } from 'utils/operations';
import { useState } from 'react';
import { LoginLoader } from 'components/Loader/LoginLoader';
import { t } from 'i18next';

let schema = yup.object().shape({
  name: yup.string().required(t('login.required')),
  email: yup.string().email().required(t('login.required')),
  password: yup.string().min(6).required(t('login.required')),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref('password'), null], `${t('login.passMustMatch')}`),
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
        <FormTitle>{t('login.signup')}</FormTitle>

        <p>email</p>
        <Label htmlFor="email">
          <StyledField name="email" type="email" placeholder=" "></StyledField>
          <StyledErrorMsg component="div" name="email" />
        </Label>

        <p>{t('login.name')}</p>
        <Label htmlFor="name">
          <StyledField name="name" type="text" placeholder=" "></StyledField>
          <StyledErrorMsg component="div" name="name" />
        </Label>

        <p>{t('login.pass')}</p>
        <Label htmlFor="password">
          <StyledField
            name="password"
            type="password"
            placeholder=" "
            autoComplete="off"
          ></StyledField>
          <StyledErrorMsg component="div" name="password" />
        </Label>

        <p>{t('login.rePass')}</p>
        <Label htmlFor="passwordConfirm">
          <StyledField
            name="passwordConfirm"
            type="password"
            placeholder=" "
            autoComplete="off"
          ></StyledField>
          <StyledErrorMsg component="div" name="passwordConfirm" />
        </Label>

        <LoginButton type="submit" disabled={isProcessing}>
          {isProcessing ? `${t('buttons.wait')}` : `${t('buttons.signup')}`}{' '}
          <LoginLoader isProcessing={isProcessing} />
        </LoginButton>

        <TextLink to="/">{t('login.login')}</TextLink>
      </StyledForm>
    </Formik>
  );
}

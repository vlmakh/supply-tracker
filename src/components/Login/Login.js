import { useState } from 'react';
import { login } from 'utils/operations';
import {
  StyledForm,
  FormTitle,
  StyledField,
  Label,
  StyledErrorMsg,
  LoginButton,
  TextLink,
} from './Login.styled';
import { Formik } from 'formik';
import * as yup from 'yup';
import { LoginLoader } from 'components/Loader/LoginLoader';
import { Box } from 'components/Base/Box';
import logo from 'images/polysteel.webp';
import { t } from 'i18next';

let schema = yup.object().shape({
  email: yup.string().email().required(t('login.required')),
  password: yup.string().min(6).required(t('login.required')),
});

export default function Login({ setToken, setIsLoggedIn }) {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = (values, { resetForm }) => {
    setIsProcessing(true);

    login(values)
      .then(data => {
        resetForm();
        setToken(data.token);
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
        <Box>
          <FormTitle>{t('login.login')}</FormTitle>

          <p>email</p>
          <Label htmlFor="email">
            <StyledField name="email" type="text" placeholder=" "></StyledField>
            <StyledErrorMsg component="div" name="email" />
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

          <LoginButton type="submit" disabled={isProcessing}>
            {isProcessing ? `${t('buttons.wait')}` : `${t('buttons.login')}`}{' '}
            <LoginLoader isProcessing={isProcessing} />
          </LoginButton>

          <TextLink to="/signup">{t('login.signup')}</TextLink>
        </Box>

        <Box mt={4}>
          <img src={logo} alt="logo" width="200" />
        </Box>
      </StyledForm>
    </Formik>
  );
}

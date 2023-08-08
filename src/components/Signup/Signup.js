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
import { LoginLoader } from 'components/Loader/LoginLoader';
import { t } from 'i18next';
import { useUserStore } from 'utils/store';

let schema = yup.object().shape({
  name: yup.string().required(t('login.required')),
  email: yup.string().email().required(t('login.required')),
  password: yup.string().min(6).required(t('login.required')),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref('password'), null], `${t('login.passMustMatch')}`),
});

export default function Signup() {
  const signupUser = useUserStore(state => state.signupUser);
  const isProcessing = useUserStore(state => state.isLoading);

  const handleSubmit = ({ name, email, password }, { resetForm }) => {
    const regData = { name, email, password };

    signupUser(regData, resetForm);
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

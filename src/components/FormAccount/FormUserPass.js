import { Formik } from 'formik';
import { updateUserPass } from 'utils/operations';
import * as yup from 'yup';
import { useState } from 'react';
import {
  FormStyled,
  FormTitle,
  Label,
  Input,
  ErrorStyled,
  FormButton,
} from './FormAccount.styled';
import { t } from 'i18next';

let schemaPass = yup.object().shape({
  password: yup.string().min(6).required(),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
});

export const FormUserPass = ({ setUser, email }) => {
  const [isPassUpdating, setIsPassUpdating] = useState(false);

  const handleUpdatePass = (values, { resetForm }) => {
    setIsPassUpdating(true);

    updateUserPass(values)
      .then(() => {
        resetForm();
      })
      .catch(error => {})
      .finally(() => {
        setIsPassUpdating(false);
      });
  };

  return (
    <>
      <Formik
        onSubmit={handleUpdatePass}
        initialValues={{
          password: '',
          passwordConfirm: '',
        }}
        validationSchema={schemaPass}
      >
        <FormStyled>
          <FormTitle>{t('account.changePass')}</FormTitle>

          <Label htmlFor="password">
            <Input
              name="password"
              type="password"
              placeholder={t('account.newPass')}
              autoComplete="off"
            ></Input>
            <ErrorStyled component="div" name="password" />
          </Label>

          <Label htmlFor="passwordConfirm">
            <Input
              name="passwordConfirm"
              type="password"
              placeholder={t('account.repeatNewPass')}
              autoComplete="off"
            ></Input>
            <ErrorStyled component="div" name="passwordConfirm" />

            <FormButton type="submit" disabled={isPassUpdating}>
              {isPassUpdating
                ? `${t('buttons.wait')}`
                : `${t('buttons.update')}`}
            </FormButton>
          </Label>
        </FormStyled>
      </Formik>
    </>
  );
};

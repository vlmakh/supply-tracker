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
      <FormTitle>Change password</FormTitle>

      <Formik
        onSubmit={handleUpdatePass}
        initialValues={{
          password: '',
          passwordConfirm: '',
        }}
        validationSchema={schemaPass}
      >
        <FormStyled>
          <Label htmlFor="password">
            <Input
              name="password"
              type="password"
              placeholder="New password"
              autoComplete="off"
            ></Input>
            <ErrorStyled component="div" name="password" />
          </Label>

          <Label htmlFor="passwordConfirm">
            <Input
              name="passwordConfirm"
              type="password"
              placeholder="Repeat new password"
              autoComplete="off"
            ></Input>
            <ErrorStyled component="div" name="passwordConfirm" />

            <FormButton type="submit" disabled={isPassUpdating}>
              {isPassUpdating ? 'Please wait...' : 'Update pass'}
            </FormButton>
          </Label>
        </FormStyled>
      </Formik>
    </>
  );
};

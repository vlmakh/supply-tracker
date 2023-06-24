import { NavLink } from 'react-router-dom';
import { Formik } from 'formik';
import { updateUserName, updateUserPass } from 'utils/operations';
import * as yup from 'yup';
import { useState } from 'react';
import { MdOutlineArrowBack } from 'react-icons/md';
import {
  FormStyled,
  Label,
  Input,
  ErrorStyled,
  FormButton,
} from './FormAccount.styled';

let schemaName = yup.object().shape({
  name: yup.string().min(4).required(),
});

let schemaPass = yup.object().shape({
  password: yup.string().min(6).required(),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
});

export const FormUserName = ({ setUser, email }) => {
  const [isNameUpdating, setIsNameUpdating] = useState(false);
  const [isPassUpdating, setIsPassUpdating] = useState(false);

  const handleUpdateName = (values, { resetForm }) => {
    setIsNameUpdating(true);

    updateUserName({ ...values, email })
      .then(data => {
        setUser(prevState => ({
          ...prevState,
          name: data.name,
        }));
        resetForm();
      })
      .catch(error => {})
      .finally(() => {
        setIsNameUpdating(false);
      });
  };

  const handleUpdatePass = (values, { resetForm }) => {
    setIsPassUpdating(true);

    updateUserPass({ ...values, email })
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
      <h4>Change name</h4>
      <Formik
        onSubmit={handleUpdateName}
        initialValues={{
          name: '',
        }}
        validationSchema={schemaName}
      >
        <FormStyled>
          <Label htmlFor="name">
            <Input name="name" type="text" placeholder="New name"></Input>
            <ErrorStyled component="div" name="name" />

            <FormButton type="submit" disabled={isNameUpdating}>
              {isNameUpdating ? 'Please wait...' : 'Update name'}
            </FormButton>
          </Label>
        </FormStyled>
      </Formik>

      <h4>Change password</h4>
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

      <NavLink to="/tasks">
        <MdOutlineArrowBack size="24" />
        Back to tasks
      </NavLink>
    </>
  );
};

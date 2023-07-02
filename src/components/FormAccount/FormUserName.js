import { Formik } from 'formik';
import { updateUserName } from 'utils/operations';
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

let schemaName = yup.object().shape({
  name: yup.string().min(4).required(),
});

export const FormUserName = ({ setUser, name }) => {
  const [isNameUpdating, setIsNameUpdating] = useState(false);

  const handleUpdateName = (values, { resetForm }) => {
    setIsNameUpdating(true);

    updateUserName(values)
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

  return (
    <>
      <Formik
        onSubmit={handleUpdateName}
        initialValues={{
          name: '',
        }}
        validationSchema={schemaName}
      >
        <FormStyled>
          <FormTitle>{t('account.changeName')}</FormTitle>

          <Label htmlFor="name">
            <Input
              name="name"
              type="text"
              placeholder={t('account.newName')}
            ></Input>
            <ErrorStyled component="div" name="name" />

            <FormButton type="submit" disabled={isNameUpdating}>
              {isNameUpdating
                ? `${t('buttons.wait')}`
                : `${t('buttons.update')}`}
            </FormButton>
          </Label>
        </FormStyled>
      </Formik>
    </>
  );
};

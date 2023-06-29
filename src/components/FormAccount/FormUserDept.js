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
});

export const FormUserDept = ({ setUser, email }) => {
  const [isDeptUpdating, setIsDeptUpdating] = useState(false);

  const handleUpdatePass = (values, { resetForm }) => {
    setIsDeptUpdating(true);

    updateUserPass(values)
      .then(() => {
        resetForm();
      })
      .catch(error => {})
      .finally(() => {
        setIsDeptUpdating(false);
      });
  };

  return (
    <>
      <Formik
        onSubmit={handleUpdatePass}
        initialValues={{
          password: '',
        }}
        validationSchema={schemaPass}
      >
        <FormStyled>
          <FormTitle>{t('account.department')}</FormTitle>

          <Label htmlFor="department">
            <Input
              name="department"
              type="text"
              //   placeholder=''
              autoComplete="off"
              as="select"
            >
              <option value="importPS">{t('account.importPS')}</option>
              <option value="supplyPS">{t('account.supplyPS')}</option>
              <option value="importUT">{t('account.importUT')}</option>
              <option value="supplyUT">{t('account.supplyUT')}</option>
            </Input>
            <ErrorStyled component="div" name="department" />

            <FormButton type="submit" disabled={isDeptUpdating}>
              {isDeptUpdating
                ? `${t('buttons.wait')}`
                : `${t('buttons.update')}`}
            </FormButton>
          </Label>
        </FormStyled>
      </Formik>
    </>
  );
};

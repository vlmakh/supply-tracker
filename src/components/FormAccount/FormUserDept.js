import { useState } from 'react';
// import { updateUserPass } from 'utils/operations';
import { Formik } from 'formik';
import {
  FormStyled,
  FormTitle,
  Label,
  Input,
  ErrorStyled,
  FormButton,
} from './FormAccount.styled';
import { t } from 'i18next';

export const FormUserDept = ({ setUser, email }) => {
  const [isDeptUpdating, setIsDeptUpdating] = useState(false);

  const handleUpdateDept = values => {
    setIsDeptUpdating(true);

    console.log(values);
    setIsDeptUpdating(false);

    // updateUserPass(values)
    //   .then(() => {
    //     resetForm();
    //   })
    //   .catch(error => {})
    //   .finally(() => {
    //     setIsDeptUpdating(false);
    //   });
  };

  return (
    <>
      <Formik
        onSubmit={handleUpdateDept}
        initialValues={{
          department: '',
        }}
      >
        <FormStyled>
          <FormTitle>{t('account.department')}</FormTitle>

          <Label htmlFor="department">
            <Input name="department" as="select">
              <option value={t('account.importPS')}>
                {t('account.importPS')}
              </option>
              <option value={t('account.supplyPS')}>
                {t('account.supplyPS')}
              </option>
              <option value={t('account.importUT')}>
                {t('account.importUT')}
              </option>
              <option value={t('account.supplyUT')}>
                {t('account.supplyUT')}
              </option>
            </Input>
            <ErrorStyled component="div" name="department" />

            <FormButton type="submit" disabled>
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

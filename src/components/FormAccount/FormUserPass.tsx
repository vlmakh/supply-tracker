import { Formik } from 'formik';
import * as yup from 'yup';
import {
  FormStyled,
  FormTitle,
  Label,
  Input,
  ErrorStyled,
  FormButton,
} from './FormAccount.styled';
import { t } from 'i18next';
import { useUserStore } from 'utils/store';
import { IResetForm } from 'components/types';

let schemaPass = yup.object().shape({
  password: yup.string().min(6).required(),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref('password'), undefined], 'Passwords must match'),
});

export const FormUserPass = () => {
  const updatePass = useUserStore(state => state.updatePass);
  const isPassUpdating = useUserStore(state => state.isLoading);

  const handleUpdatePass = (values: {password: string}, { resetForm }: IResetForm) => {
    updatePass(values, resetForm);
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

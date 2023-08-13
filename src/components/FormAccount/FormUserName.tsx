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

let schemaName = yup.object().shape({
  name: yup.string().min(4).required(),
});

export const FormUserName = () => {
  const updateName = useUserStore(state => state.updateName);
  const isNameUpdating = useUserStore(state => state.isLoading);

  const handleUpdateName = (values: {name: string}, { resetForm }: IResetForm) => {
    updateName(values, resetForm);
  };

  return (
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
            {isNameUpdating ? `${t('buttons.wait')}` : `${t('buttons.update')}`}
          </FormButton>
        </Label>
      </FormStyled>
    </Formik>
  );
};

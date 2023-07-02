import { Box } from 'components/Base/Box';
import { Navigate } from 'react-router-dom';
import { TaskContext } from 'utils/context';
import { useContext } from 'react';
import Modal from 'components/Modal/Modal';
import { Loader } from 'components/Loader/Loader';
import { FormUserName } from 'components/FormAccount/FormUserName';
import { FormUserPass } from 'components/FormAccount/FormUserPass';
import { MdOutlineArrowBack } from 'react-icons/md';
import {
  BackLink,
  FormStyled,
  Label,
  Input,
  FormTitle,
  FormButton,
} from 'components/FormAccount/FormAccount.styled';
import { Formik } from 'formik';
import { t } from 'i18next';
import { FormUserDept } from 'components/FormAccount/FormUserDept';

export default function AccountPage({
  name,
  setUser,
  isLoggedIn,
  currentLang,
  setCurrentLang,
}) {
  const { isLoading } = useContext(TaskContext);

  const turnLang = values => {
    setCurrentLang(values.lang);
  };

  return (
    <>
      {!isLoggedIn && <Navigate to="/" />}

      <Box mt={5} mx="auto">
        <BackLink to="/tasks">
          <MdOutlineArrowBack size="24" />
          {t('account.toTasks')}
        </BackLink>

        <FormUserName name={name} setUser={setUser} />

        <FormUserPass setUser={setUser} />

        <Formik
          onSubmit={turnLang}
          initialValues={{
            lang: currentLang,
          }}
        >
          <FormStyled>
            <FormTitle>{t('account.changeLang')}</FormTitle>

            <Label>
              <Input as="select" name="lang">
                <option value="en">English</option>
                <option value="uk">Українська</option>
              </Input>

              <FormButton type="submit">{t('buttons.update')}</FormButton>
            </Label>
          </FormStyled>
        </Formik>

        <FormUserDept />
      </Box>

      {isLoading && (
        <Modal>
          <Loader />
        </Modal>
      )}
    </>
  );
}

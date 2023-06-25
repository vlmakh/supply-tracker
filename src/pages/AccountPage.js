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

export default function AccountPage({
  email,
  setUser,
  isLoggedIn,
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
          Back to tasks
        </BackLink>

        <FormUserName email={email} setUser={setUser} />

        <FormUserPass setUser={setUser} />

        <Formik
          onSubmit={turnLang}
          initialValues={{
            lang: 'English',
          }}
        >
          <FormStyled>
            <FormTitle>{t('account.changeLang')}</FormTitle>

            <Label>
              <Input as="select" name="lang">
                <option value="en">English</option>
                <option value="uk">Українська</option>
              </Input>

              <FormButton type="submit">Apply</FormButton>
            </Label>
          </FormStyled>
        </Formik>
      </Box>

      {isLoading && (
        <Modal>
          <Loader />
        </Modal>
      )}
    </>
  );
}

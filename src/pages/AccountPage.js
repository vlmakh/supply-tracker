import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { TaskContext } from 'utils/context';
import { Box } from 'components/Base/Box';
import { MainWrap } from 'components/Container/Container.styled';
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

      <MainWrap>
        <BackLink to="/tasks">
          <MdOutlineArrowBack size="24" />
          {t('account.toTasks')}
        </BackLink>

        <Box p="16px 16px 32px" borderTop="1px solid lightgray">
          <h4>{name}</h4>
          <p>{t('account.supply')}</p>
        </Box>

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
      </MainWrap>

      {isLoading && (
        <Modal>
          <Loader />
        </Modal>
      )}
    </>
  );
}

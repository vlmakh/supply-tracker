import {
  HomeBox,
  FormBox,
  LinkBox,
  MenuLink,
} from 'components/Login/Login.styled';
import { Navigate, Outlet } from 'react-router-dom';
import { t } from 'i18next';

export default function HomePage({ isLoggedIn }) {
  return (
    <>
      {isLoggedIn && <Navigate to="/tasks" />}

      <HomeBox>
        <FormBox>
          <LinkBox>
            <MenuLink to="/">{t('login.login')}</MenuLink>
            <MenuLink to="/signup">{t('login.signup')}</MenuLink>
          </LinkBox>

          <Outlet />
        </FormBox>
      </HomeBox>
    </>
  );
}

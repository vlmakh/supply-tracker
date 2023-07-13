import { FormWrap, GreenLine, FormBox } from 'components/Login/Login.styled';
import { Navigate, Outlet } from 'react-router-dom';
// import { t } from 'i18next';
// import { Box } from 'components/Base/Box';

export default function HomePage({ isLoggedIn }) {
  return (
    <>
      {isLoggedIn && <Navigate to="/tasks" />}

      <FormWrap>
        <GreenLine></GreenLine>

        <FormBox>
          <Outlet />
        </FormBox>
      </FormWrap>
    </>
  );
}

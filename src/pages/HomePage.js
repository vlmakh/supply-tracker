import { FormWrap, GreenLine, FormBox } from 'components/Login/Login.styled';
import { Navigate, Outlet } from 'react-router-dom';
import { Box } from 'components/Base/Box';
import logo from 'images/polysteel.webp';

export default function HomePage({ isLoggedIn }) {
  return (
    <>
      {isLoggedIn && <Navigate to="/tasks" />}

      <FormWrap>
        <GreenLine></GreenLine>

        <FormBox>
          <Outlet />

          <Box mt={4}>
            <img src={logo} alt="logo" width="200" />
          </Box>
        </FormBox>
      </FormWrap>
    </>
  );
}

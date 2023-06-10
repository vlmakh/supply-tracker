import {
  HomeBox,
  FormBox,
  ImgBox,
  LinkBox,
  MenuLink,
} from 'components/Login/Login.styled';
import { Navigate, Outlet } from 'react-router-dom';
import logo from 'images/task-manager.png';

export default function HomePage({ isLoggedIn }) {
  return (
    <>
      {isLoggedIn && <Navigate to="/tasks" />}

      <HomeBox>
        <ImgBox>
          <img src={logo} alt="logo" width="200" />
        </ImgBox>

        <FormBox>
          <LinkBox>
            <MenuLink to="/">Login</MenuLink>
            <MenuLink to="/signup">Registration</MenuLink>
          </LinkBox>

          <Outlet />
        </FormBox>
      </HomeBox>
    </>
  );
}

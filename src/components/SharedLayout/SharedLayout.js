import { Outlet, Link } from 'react-router-dom';
import { Suspense } from 'react';
import {
  Layout,
  Header,
  DateToday,
  Footer,
  MyLink,
} from './SharedLayout.styled';
import { LogoVM } from 'components/LogoVM/LogoVM';
import { formatDate } from 'utils/formatDate';
import { logout } from 'utils/operations';

export const SharedLayout = ({ email, isLoggedIn, setIsLoggedIn }) => {
  const today = new Date();

  const handleLogout = () => {
    logout().then(() => {
      setIsLoggedIn(false);
    });
  };

  return (
    <Layout>
      <Header>
        <p>{email}</p>

        <DateToday>{formatDate(today)}</DateToday>

        {isLoggedIn && (
          <Link to="/" onClick={handleLogout}>
            Logout
          </Link>
        )}
      </Header>

      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>

      <Footer>
        <MyLink href="https://vlmakh.github.io/my-portfolio/" target="blank">
          <LogoVM />
        </MyLink>
        <p>2023</p>
        <MyLink href="mailto:vlmakh@gmail.com">vlmakh@gmail.com</MyLink>
      </Footer>
    </Layout>
  );
};

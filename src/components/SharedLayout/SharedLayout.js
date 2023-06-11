import { Outlet, Link } from 'react-router-dom';
import { Suspense, useContext } from 'react';
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
import { TaskContext } from 'utils/context';

export const SharedLayout = ({ email, isLoggedIn, setIsLoggedIn }) => {
  const { tasks } = useContext(TaskContext);
  const today = new Date();

  const calcCompleted = array => {
    if (array.length) {
      return array.filter(item => item.completed).length;
    }
  };

  const handleLogout = () => {
    logout().then(() => {
      setIsLoggedIn(false);
    });
  };

  return (
    <Layout>
      <Header>
        {isLoggedIn && (
          <>
            <p>{email}</p>
            {tasks && (
              <p>
                <b>
                  {calcCompleted(tasks)} / {tasks.length}
                </b>
              </p>
            )}
            <DateToday>{formatDate(today)}</DateToday>
            <Link to="/" onClick={handleLogout}>
              Logout
            </Link>
          </>
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

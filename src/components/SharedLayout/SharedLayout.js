import { Outlet } from 'react-router-dom';
import { Suspense, useContext } from 'react';
import {
  Layout,
  Header,
  DateToday,
  Footer,
  MyLink,
  Green,
  Logout,
} from './SharedLayout.styled';
import { Container } from 'components/Container/Container.styled';
import { LogoVM } from 'components/LogoVM/LogoVM';
import { formatDate } from 'utils/formatDate';
import { logout } from 'utils/operations';
import { TaskContext } from 'utils/context';
import { IoMdLogOut } from 'react-icons/io';

export const SharedLayout = ({ user, isLoggedIn, setIsLoggedIn }) => {
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
        <Container>
          {isLoggedIn && (
            <>
              {tasks && (
                <p>
                  <b>
                    {tasks.length} / <Green>{calcCompleted(tasks)} </Green>
                  </b>
                </p>
              )}
              <DateToday>{formatDate(today)}</DateToday>

              <Logout to="/" onClick={handleLogout}>
                {user}
                <IoMdLogOut size="18" />
              </Logout>
            </>
          )}
        </Container>
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

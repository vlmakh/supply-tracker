import { Outlet, Link } from 'react-router-dom';
import { Suspense } from 'react';
import {
  Layout,
  Header,
  Nav,
  DateToday,
  Footer,
  MyLink,
} from './SharedLayout.styled';
import { LogoVM } from 'components/LogoVM/LogoVM';
import { formatDate } from 'utils/formatDate';

export const SharedLayout = () => {
  return (
    <Layout>
      <Header>
        <Nav>
          <Link to="/">Home</Link>
          <Link to="tasks">Tasks</Link>
        </Nav>
        <DateToday>{formatDate(new Date())}</DateToday>
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

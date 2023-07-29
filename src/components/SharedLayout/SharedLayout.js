import { Suspense, useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { logout } from 'utils/operations';
import { TaskContext } from 'utils/context';
import {
  Layout,
  Header,
  TaskCalc,
  Footer,
  MyLink,
  Green,
  UserMenuBtn,
  // ApplyBtn,
  ImgBox,
} from './SharedLayout.styled';
import { DatePickerStyled } from 'components/FormTask/FormTask.styled';
import { Container } from 'components/Container/Container.styled';
import 'react-datepicker/dist/react-datepicker.css';
import { UserMenu } from 'components/UserMenu/UserMenu';
import uk from 'date-fns/locale/uk';
import { registerLocale } from 'react-datepicker';
import { TaskMenu } from 'components/TaskMenu/TaskMenu';
import { TaskSearch } from 'components/TaskSearch/TaskSearch';
import { Box } from 'components/Base/Box';
import { LogoVM } from 'components/LogoVM/LogoVM';
import { HiOutlineUserCircle } from 'react-icons/hi';
// import { MdRestartAlt } from 'react-icons/md';
import logo from 'images/logo256.webp';

export const SharedLayout = ({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  hadleGetTasksByRange,
}) => {
  const { user, setUser, tasks, setIsLoading, currentLang } =
    useContext(TaskContext);
  const today = new Date();
  registerLocale('uk', uk);

  // const handleApplyRange = () => {
  //   hadleGetTasksByRange(startDate, endDate);
  // };

  const calcCompleted = array => {
    if (array.length) {
      const completedTasks = array.filter(item => item.completed).length;
      return completedTasks;
    }
  };

  const handleLogout = () => {
    setIsLoading(true);
    logout()
      .then(() => {
        localStorage.removeItem('splmgr');
      })
      .finally(() => {
        setUser({});
        setIsLoading(false);
      });
  };

  return (
    <Layout>
      <Header>
        <Container>
          {user.email ? (
            <>
              {tasks && (
                <TaskCalc to="/tasks/uncompleted">
                  <b>{tasks.length}</b> /{' '}
                  <Green>{calcCompleted(tasks) ?? '0'} </Green>
                </TaskCalc>
              )}

              <TaskSearch startDate={startDate} endDate={endDate} />

              <TaskMenu />

              <Box display="flex" py={1} ml={5}>
                <DatePickerStyled
                  dateFormat="dd.MM.yyyy"
                  selected={startDate}
                  onChange={date => setStartDate(date)}
                  selectsStart
                  startDate={startDate}
                  endDate={endDate}
                  calendarStartDay={1}
                  locale={currentLang}
                  maxDate={today}
                />
                <DatePickerStyled
                  dateFormat="dd.MM.yyyy"
                  selected={endDate}
                  onChange={date => setEndDate(date)}
                  selectsEnd
                  startDate={startDate}
                  endDate={endDate}
                  minDate={startDate}
                  calendarStartDay={1}
                  locale={currentLang}
                />

                {/* <ApplyBtn type="button" onClick={handleApplyRange}>
                  <MdRestartAlt size="24" />
                </ApplyBtn> */}
              </Box>

              <UserMenuBtn>
                <HiOutlineUserCircle size="24" />

                <UserMenu
                  handleLogout={handleLogout}
                  name={user.name}
                  email={user.email}
                />
              </UserMenuBtn>
            </>
          ) : (
            <Box display="flex" alignItems="center" py={2}>
              <ImgBox>
                <img src={logo} alt="logo" width="32" />
              </ImgBox>
              <b>POLYSTEEL SUPPLY TRACKER</b>
            </Box>
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

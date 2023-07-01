import { Outlet } from 'react-router-dom';
import { Suspense, useContext, useState } from 'react';
import {
  Layout,
  Header,
  DateToday,
  TaskCalc,
  Footer,
  MyLink,
  Green,
  UserMenuBtn,
  ApplyBtn,
  MenuBtn,
} from './SharedLayout.styled';
import { DatePickerStyled } from 'components/FormTask/FormTask.styled';
import { Container } from 'components/Container/Container.styled';
import { LogoVM } from 'components/LogoVM/LogoVM';
import { formatDate } from 'utils/formatDate';
import { logout } from 'utils/operations';
import { TaskContext } from 'utils/context';
import 'react-datepicker/dist/react-datepicker.css';
import { Box } from 'components/Base/Box';
import { UserMenu } from 'components/UserMenu/UserMenu';
import { HiOutlineUserCircle } from 'react-icons/hi';
import { MdRestartAlt, MdRemoveDone } from 'react-icons/md';
import uk from 'date-fns/locale/uk';
import { registerLocale } from 'react-datepicker';
import { TaskMenu } from 'components/TaskMenu/TaskMenu';

export const SharedLayout = ({
  user,
  isLoggedIn,
  setIsLoggedIn,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  hadleGetTasksByRange,
  setToken,
  setUser,
  showAllTasksInCurrentMonth,
  firstOfMonth,
}) => {
  const { dispatch, tasks, setIsLoading, currentLang } =
    useContext(TaskContext);
  const [showUncompleted, setShowUncompleted] = useState(false);
  const today = new Date();
  registerLocale('uk', uk);

  const handleApplyRange = () => {
    hadleGetTasksByRange(startDate, endDate);
  };

  const calcCompleted = array => {
    if (array.length) {
      const completedTasks = array.filter(item => item.completed).length;
      return completedTasks;
    }
  };

  const showUncompletedTasks = () => {
    if (showUncompleted === false) {
      setShowUncompleted(true);

      dispatch({ type: 'uncompletedTasks' });
    } else {
      setShowUncompleted(false);

      showAllTasksInCurrentMonth(firstOfMonth, today);
    }
  };

  const handleLogout = () => {
    setIsLoading(true);
    logout()
      .then(() => {
        setToken(null);
      })
      .finally(() => {
        setUser({});
        setIsLoggedIn(false);
      });
  };

  return (
    <Layout>
      <Header>
        <Container>
          {isLoggedIn ? (
            <>
              {tasks && (
                <TaskCalc to="/tasks">
                  <b>{tasks.length}</b> /{' '}
                  <Green>{calcCompleted(tasks) ?? '0'} </Green> /{' '}
                  {Math.round((calcCompleted(tasks) / tasks.length) * 100)}%
                </TaskCalc>
              )}

              <MenuBtn onClick={showUncompletedTasks} pressed={showUncompleted}>
                <MdRemoveDone size="24" />
              </MenuBtn>

              <TaskMenu />

              <DateToday>{formatDate(today)}</DateToday>

              <Box display="flex" py={1}>
                <DatePickerStyled
                  dateFormat="dd.MM.yyyy"
                  selected={startDate}
                  onChange={date => setStartDate(date)}
                  selectsStart
                  startDate={startDate}
                  endDate={endDate}
                  calendarStartDay={1}
                  locale={currentLang}
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

                <ApplyBtn type="button" onClick={handleApplyRange}>
                  <MdRestartAlt size="24" />
                </ApplyBtn>
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
            <Box width="80px" mx="auto">
              <DateToday>{formatDate(today)}</DateToday>
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

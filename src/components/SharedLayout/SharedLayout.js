import { Outlet } from 'react-router-dom';
import { Suspense, useContext } from 'react';
import {
  Layout,
  Header,
  DateToday,
  TaskCalc,
  Footer,
  MyLink,
  Green,
  UserMenuBtn,
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
// import {  } from 'components/Base/Buttons.styled';

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
}) => {
  const { tasks, setIsLoading } = useContext(TaskContext);
  const today = new Date();

  const handleApplyRange = () => {
    hadleGetTasksByRange(startDate, endDate);
  };

  const calcCompleted = array => {
    if (array.length) {
      const completedTasks = array.filter(item => item.completed).length;
      return completedTasks;
    }
  };

  const handleLogout = () => {
    setIsLoading(true);
    logout().then(() => {
      setIsLoggedIn(false);
      setToken(null);
    });
    // .finally(() => setIsLoading(false));
  };

  return (
    <Layout>
      <Header>
        <Container>
          {isLoggedIn ? (
            <>
              {tasks && (
                <TaskCalc>
                  {tasks.length} / <Green>{calcCompleted(tasks) ?? '0'} </Green>
                </TaskCalc>
              )}
              <DateToday>{formatDate(today)}</DateToday>

              <Box display="flex" py={2}>
                <DatePickerStyled
                  dateFormat="dd.MM.yyyy"
                  selected={startDate}
                  onChange={date => setStartDate(date)}
                  selectsStart
                  startDate={startDate}
                  endDate={endDate}
                  calendarStartDay={1}
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
                />

                <button type="button" onClick={handleApplyRange}>
                  Apply
                </button>
              </Box>

              <UserMenuBtn>
                <HiOutlineUserCircle size="24" />

                <UserMenu handleLogout={handleLogout} user={user} />
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

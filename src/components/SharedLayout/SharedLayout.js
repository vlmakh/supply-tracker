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
  UserName,
  Logout,
} from './SharedLayout.styled';
import { DatePickerStyled } from 'components/FormTask/FormTask.styled';
import { Container } from 'components/Container/Container.styled';
import { LogoVM } from 'components/LogoVM/LogoVM';
import { formatDate } from 'utils/formatDate';
import { logout } from 'utils/operations';
import { TaskContext } from 'utils/context';
import { IoMdLogOut } from 'react-icons/io';
// import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Box } from 'components/Base/Box';

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
  const { tasks } = useContext(TaskContext);
  const today = new Date();

  const handleApplyRange = () => {
    hadleGetTasksByRange(startDate, endDate);
  };

  const calcCompleted = array => {
    if (array.length) {
      const completedTasks = array.filter(item => item.completed).length;
      // console.log(completedTasks);
      return completedTasks;
    }
  };

  const handleLogout = () => {
    logout().then(() => {
      setIsLoggedIn(false);
      setToken(null);
    });
  };

  return (
    <Layout>
      <Header>
        <Container>
          {isLoggedIn && (
            <>
              {tasks && (
                <TaskCalc>
                  {tasks.length} / <Green>{calcCompleted(tasks) ?? '0'} </Green>
                </TaskCalc>
              )}
              <DateToday>{formatDate(today)}</DateToday>

              <Box display="flex">
                <DatePickerStyled
                  dateFormat="dd.MM.yyyy"
                  selected={startDate}
                  onChange={date => setStartDate(date)}
                  selectsStart
                  startDate={startDate}
                  endDate={endDate}
                />
                <DatePickerStyled
                  dateFormat="dd.MM.yyyy"
                  selected={endDate}
                  onChange={date => setEndDate(date)}
                  selectsEnd
                  startDate={startDate}
                  endDate={endDate}
                  minDate={startDate}
                />

                <button type="button" onClick={handleApplyRange}>
                  Apply
                </button>
              </Box>

              <Logout to="/" onClick={handleLogout}>
                <UserName>{user}</UserName>
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

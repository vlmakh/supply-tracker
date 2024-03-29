import { FC, Dispatch, SetStateAction, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import {
  Layout,
  Header,
  TaskCalc,
  Footer,
  MyLink,
  Green,
  UserMenuBtn,
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
import logo from 'images/logo256.webp';
import { t } from 'i18next';
import { useUserStore, useTaskStore } from 'utils/store';

type Props = {
  today: Date;
  startDate: Date;
  setStartDate: Dispatch<SetStateAction<Date>>;
  endDate: Date;
  setEndDate: Dispatch<SetStateAction<Date>>;
};

export const SharedLayout: FC<Props> = ({
  today,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}) => {
  const { tasks, info } = useTaskStore(state => state);

  const { user, resetUser } = useUserStore(state => state);
  const currentLang = t('lang').split('-')[0];

  registerLocale('uk', uk);

  const calcCompleted = info.completed;

  return (
    <Layout>
      <Header>
        <Container>
          {user?.email ? (
            <>
              {tasks && (
                <TaskCalc to="/tasks/uncompleted">
                  <b>{info.total}</b> / <Green>{calcCompleted ?? '0'} </Green>
                </TaskCalc>
              )}

              <TaskSearch
                startDate={startDate}
                endDate={endDate}
                today={today}
              />

              <TaskMenu />

              <Box display="flex" py={1} ml={5}>
                <DatePickerStyled
                  dateFormat="dd.MM.yyyy"
                  selected={startDate}
                  onChange={(date: Date) => setStartDate(date)}
                  selectsStart
                  startDate={startDate}
                  endDate={endDate}
                  calendarStartDay={1}
                  locale={currentLang}
                  maxDate={today}
                  name="startDate"
                />
                <DatePickerStyled
                  dateFormat="dd.MM.yyyy"
                  selected={endDate}
                  onChange={(date: Date) => setEndDate(date)}
                  selectsEnd
                  startDate={startDate}
                  endDate={endDate}
                  minDate={startDate}
                  calendarStartDay={1}
                  locale={currentLang}
                  name="endDate"
                />
              </Box>

              <UserMenuBtn>
                <HiOutlineUserCircle size="24" />

                <UserMenu
                  handleLogout={resetUser}
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
        <p>2023</p>
        <p>By</p>
        <MyLink href="https://vlad-makhnenko.netlify.app/" target="blank">
          <LogoVM />
        </MyLink>
      </Footer>
    </Layout>
  );
};

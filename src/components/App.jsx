import { ThemeProvider } from '@emotion/react';
import { theme } from 'utils/theme';
import { useState, useEffect, lazy, useMemo, useCallback } from 'react';
import { Routes, Route } from 'react-router-dom';
import { SharedLayout } from './SharedLayout/SharedLayout';
import Modal from 'components/Modal/Modal';
import { Loader } from 'components/Loader/Loader';
import { useTranslation } from 'react-i18next';
import { Toaster } from 'react-hot-toast';
import { useUserStore, useTaskStore, useUserListStore } from 'utils/store';

const HomePage = lazy(() => import('pages/HomePage'));
const Login = lazy(() => import('components/Login/Login'));
const Signup = lazy(() => import('components/Signup/Signup'));
const TasksPage = lazy(() => import('pages/TasksPage'));
const AccountPage = lazy(() => import('pages/AccountPage'));
const ErrorPage = lazy(() => import('pages/ErrorPage'));

const savedLang = JSON.parse(localStorage.getItem('splmgr-lang'));

export const App = () => {
  const email = useUserStore(state => state.user?.email);
  const checkUser = useUserStore(state => state.checkUser);
  const isLoading = useUserStore(state => state.isLoading);

  const [currentLang, setCurrentLang] = useState(savedLang ?? 'en');

  const { hadleGetUncompletedTasksByRange } = useTaskStore(state => state);

  const today = useMemo(() => new Date(), []);
  const getYear = today.getFullYear();
  const getMonth = today.getMonth();
  const firstOfMonth = useMemo(
    () => new Date(getYear, getMonth, 1),
    [getMonth, getYear]
  );

  const [startDate, setStartDate] = useState(firstOfMonth);
  const [endDate, setEndDate] = useState(today);

  const { i18n } = useTranslation();
  const changeLanguage = useCallback(
    language => {
      i18n.changeLanguage(language);
    },
    [i18n]
  );

  const { userList } = useUserListStore(state => state);
  console.log(userList)

  useEffect(() => {
    checkUser();
  }, [checkUser]);

  useEffect(() => {
    if (!email) {
      return;
    }

    hadleGetUncompletedTasksByRange(firstOfMonth, today);
  }, [firstOfMonth, today, email, hadleGetUncompletedTasksByRange]);

  useEffect(() => {
    localStorage.setItem('splmgr-lang', JSON.stringify(currentLang));

    changeLanguage(currentLang);
  }, [changeLanguage, currentLang]);

  const hadleGetTasksByRange = (start, end) => {
    hadleGetUncompletedTasksByRange(start, end);
  };

  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route
          path="/"
          element={
            <SharedLayout
              today={today}
              startDate={startDate}
              setStartDate={setStartDate}
              endDate={endDate}
              setEndDate={setEndDate}
              hadleGetTasksByRange={hadleGetTasksByRange}
            />
          }
        >
          <Route path="/" element={<HomePage />}>
            <Route index element={<Login />} />

            <Route path="/signup" element={<Signup />} />
          </Route>

          <Route
            path="tasks/:category"
            element={
              <TasksPage
                startDate={startDate}
                endDate={endDate}
                today={today}
              />
            }
          />

          <Route
            path="account"
            element={<AccountPage setCurrentLang={setCurrentLang} />}
          />

          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>

      {isLoading && (
        <Modal>
          <Loader />
        </Modal>
      )}

      <Toaster
        position="top-center"
        toastOptions={{
          duration: 2000,
        }}
      />
    </ThemeProvider>
  );
};

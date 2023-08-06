import { ThemeProvider } from '@emotion/react';
import { theme } from 'utils/theme';
import {
  useState,
  useEffect,
  lazy,
  useReducer,
  useMemo,
  useCallback,
} from 'react';
import { Routes, Route } from 'react-router-dom';
import { getUncompletedTasksByRange } from 'utils/operations';
import { TaskContext } from 'utils/context';
import { reducer } from 'utils/reducer';
import { SharedLayout } from './SharedLayout/SharedLayout';
import Modal from 'components/Modal/Modal';
import { Loader } from 'components/Loader/Loader';
import { useTranslation } from 'react-i18next';
import { Toaster } from 'react-hot-toast';

import { useUserStore } from 'utils/store';

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
  
  const [tasks, dispatch] = useReducer(reducer, []);

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

  useEffect(() => {
    checkUser();
  }, [checkUser]);

  useEffect(() => {
    if (!email) {
      return;
    }

    hadleGetTasksByRange(firstOfMonth, today);
  }, [firstOfMonth, today, email]);

  useEffect(() => {
    localStorage.setItem('splmgr-lang', JSON.stringify(currentLang));

    changeLanguage(currentLang);
  }, [changeLanguage, currentLang]);

  const hadleGetTasksByRange = (start, end) => {
    // setIsLoading(true);

    getUncompletedTasksByRange(start, end)
      .then(tasks => {
        dispatch({ type: 'getTasks', tasks });
      })
      .catch(error => {})
      .finally(() => {
        // setIsLoading(false);
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <TaskContext.Provider
        value={{
          dispatch,
          tasks,
          isLoading,
          currentLang,
          setCurrentLang,
        }}
      >
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

            <Route path="account" element={<AccountPage />} />

            <Route path="*" element={<ErrorPage />} />
          </Route>
        </Routes>
      </TaskContext.Provider>

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

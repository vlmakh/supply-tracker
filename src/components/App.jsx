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
import { checkCurrentUser, getTasksByRange } from 'utils/operations';
import { TaskContext } from 'utils/context';
import { reducer } from 'utils/reducer';
import { SharedLayout } from './SharedLayout/SharedLayout';
import Modal from 'components/Modal/Modal';
import { Loader } from 'components/Loader/Loader';
import { useTranslation } from 'react-i18next';
import { Toaster } from 'react-hot-toast';

const HomePage = lazy(() => import('pages/HomePage'));
const Login = lazy(() => import('components/Login/Login'));
const Signup = lazy(() => import('components/Signup/Signup'));
const TasksPage = lazy(() => import('pages/TasksPage'));
const AccountPage = lazy(() => import('pages/AccountPage'));
const ErrorPage = lazy(() => import('pages/ErrorPage'));

const savedToken = JSON.parse(localStorage.getItem('splmgr'));
const savedLang = JSON.parse(localStorage.getItem('splmgr-lang'));

export const App = () => {
  const [user, setUser] = useState({});
  const [token, setToken] = useState(savedToken ?? null);
  const [currentLang, setCurrentLang] = useState(savedLang ?? 'en');
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
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
    setToken(token);

    localStorage.setItem('splmgr', JSON.stringify(token));

    checkCurrentUser(token)
      .then(data => {
        if (data.name) {
          setUser({ ...data });
          setIsLoggedIn(true);
        }
      })
      .catch(error => {})
      .finally(() => {
        setIsLoading(false);
      });
  }, [token]);

  useEffect(() => {
    if (isLoggedIn) {
      setIsLoading(true);

      showAllTasksInCurrentMonth(firstOfMonth, today);
    }
  }, [firstOfMonth, isLoggedIn, today]);

  const showAllTasksInCurrentMonth = (firstOfMonth, today) => {
    getTasksByRange(firstOfMonth, today)
      .then(tasks => {
        dispatch({ type: 'getTasks', tasks });
      })
      .catch(error => {})
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    localStorage.setItem('splmgr-lang', JSON.stringify(currentLang));

    changeLanguage(currentLang);
  }, [changeLanguage, currentLang]);

  const hadleGetTasksByRange = (start, end) => {
    setIsLoading(true);

    getTasksByRange(start, end)
      .then(tasks => {
        dispatch({ type: 'getTasks', tasks });
      })
      .catch(error => {})
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <TaskContext.Provider
        value={{ dispatch, tasks, isLoading, setIsLoading, currentLang }}
      >
        <Routes>
          <Route
            path="/"
            element={
              <SharedLayout
                user={user}
                setIsLoggedIn={setIsLoggedIn}
                isLoggedIn={isLoggedIn}
                startDate={startDate}
                setStartDate={setStartDate}
                endDate={endDate}
                setEndDate={setEndDate}
                hadleGetTasksByRange={hadleGetTasksByRange}
                setToken={setToken}
                setUser={setUser}
              />
            }
          >
            <Route path="/" element={<HomePage isLoggedIn={isLoggedIn} />}>
              <Route
                index
                element={
                  <Login setToken={setToken} setIsLoggedIn={setIsLoggedIn} />
                }
              />
              <Route path="/signup" element={<Signup />} />
            </Route>

            <Route
              path="tasks"
              element={<TasksPage isLoggedIn={isLoggedIn} />}
            />

            <Route
              path="account"
              element={
                <AccountPage
                  isLoggedIn={isLoggedIn}
                  name={user.name}
                  setUser={setUser}
                  currentLang={currentLang}
                  setCurrentLang={setCurrentLang}
                />
              }
            />

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

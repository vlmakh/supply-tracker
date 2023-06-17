import { ThemeProvider } from '@emotion/react';
import { theme } from 'utils/theme';
import { SharedLayout } from './SharedLayout/SharedLayout';
import { Routes, Route } from 'react-router-dom';
import { useState, useEffect, lazy, useReducer, useMemo } from 'react';
import { reducer } from 'utils/reducer';
import { checkCurrentUser } from 'utils/operations';
import { Toaster } from 'react-hot-toast';
import Modal from 'components/Modal/Modal';
import { Loader } from 'components/Loader/Loader';
import { getTasksByRange } from 'utils/operations';
import { TaskContext } from 'utils/context';

const HomePage = lazy(() => import('pages/HomePage'));
const Login = lazy(() => import('components/Login/Login'));
const Signup = lazy(() => import('components/Signup/Signup'));
const TaskPage = lazy(() => import('pages/TasksPage'));
const ErrorPage = lazy(() => import('pages/ErrorPage'));

const savedData = JSON.parse(localStorage.getItem('splmgr'));

export const App = () => {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState(null);
  const [token, setToken] = useState(savedData ?? null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [tasks, dispatch] = useReducer(reducer, []);

  const today = useMemo(() => new Date(), []);
  const getYear = today.getFullYear(); 
  const getMonth = today.getMonth(); 
  const firstOfMonth = useMemo(() => new Date(getYear, getMonth, 1), [getMonth, getYear]);

  const [startDate, setStartDate] = useState(firstOfMonth); 
  const [endDate, setEndDate] = useState(today);

  useEffect(() => {
    checkCurrentUser(token)
      .then(data => {
        setUser(data.name);
        setEmail(data.email);
        setIsLoggedIn(true);
        setIsLoading(false);
      })
      .catch(error => {});
  });

  useEffect(() => {
    setToken(token);
    setIsLoading(false);
    localStorage.setItem('splmgr', JSON.stringify(token))
  }, [token]);

  useEffect(() => {
    if (isLoggedIn) {setIsLoading(true);
    getTasksByRange(firstOfMonth, today)
      .then(tasks => {
        dispatch({ type: 'getTasks', tasks });
      })
      .catch(error => {})
      .finally(() => {
        setIsLoading(false);
      });}
  }, [firstOfMonth, isLoggedIn, today]);

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
  }

  return (
    <ThemeProvider theme={theme}>
      <TaskContext.Provider value={{ dispatch, tasks, isLoading, setIsLoading }}>
        <Routes>
          <Route
            path="/"
            element={
              <SharedLayout
                user={user}
                email={email}
                setIsLoggedIn={setIsLoggedIn}
                isLoggedIn={isLoggedIn}
                startDate={startDate}
                setStartDate={setStartDate}
                endDate={endDate}
                setEndDate={setEndDate}
                hadleGetTasksByRange={hadleGetTasksByRange}
                setToken={setToken}
              />
            }
          >
            <Route path="/" element={<HomePage isLoggedIn={isLoggedIn} />}>
              <Route
                index
                element={
                  <Login
                    setUser={setUser}
                    token={token}
                    setToken={setToken}
                    setIsLoggedIn={setIsLoggedIn}
                  />
                }
              />
              <Route path="/signup" element={<Signup />} />
            </Route>

            <Route
              path="tasks"
              element={
                <TaskPage
                  isLoggedIn={isLoggedIn}
                  // isLoading={isLoading}
                  // setIsLoading={setIsLoading}
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

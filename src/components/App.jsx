import { ThemeProvider } from '@emotion/react';
import { theme } from 'utils/theme';
import { SharedLayout } from './SharedLayout/SharedLayout';
import { Routes, Route } from 'react-router-dom';
import { useState, useEffect, lazy, useReducer } from 'react';
import { reducer } from 'utils/reducer';
import { checkCurrentUser } from 'utils/operations';
import { Toaster } from 'react-hot-toast';
import Modal from 'components/Modal/Modal';
import { Loader } from 'components/Loader/Loader';
import { getTasks } from 'utils/operations';
import { TaskContext } from 'utils/context';

const HomePage = lazy(() => import('pages/HomePage'));
const Login = lazy(() => import('components/Login/Login'));
const Signup = lazy(() => import('components/Signup/Signup'));
const TaskPage = lazy(() => import('pages/TasksPage'));
const ErrorPage = lazy(() => import('pages/ErrorPage'));

const startData = { token: null };
const savedData = JSON.parse(localStorage.getItem('taskmgr'));

export const App = () => {
  const [data, setData] = useState(savedData ?? startData);
  const [user, setUser] = useState(data.user ?? null);
  const [email, setEmail] = useState(data.email ?? null);
  const [token, setToken] = useState(data.token);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [tasks, dispatch] = useReducer(reducer, []);

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
    setData({ token });
    setIsLoading(false);
  }, [token]);

  useEffect(() => {
    localStorage.setItem('taskmgr', JSON.stringify(data));
  }, [data]);

  useEffect(() => {
    setIsLoading(true);
    getTasks()
      .then(tasks => {
        dispatch({ type: 'getTasks', tasks });
      })
      .catch(error => {})
      .finally(() => {
        setIsLoading(false);
      });
  }, [isLoggedIn]);

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
                setToken={setToken}
                isLoggedIn={isLoggedIn}
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

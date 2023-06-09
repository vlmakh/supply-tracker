import { ThemeProvider } from '@emotion/react';
import { theme } from 'utils/theme';
import { SharedLayout } from './SharedLayout/SharedLayout';
import { Routes, Route } from 'react-router-dom';
import { useState, useEffect, lazy } from 'react';
import { checkCurrentUser } from 'utils/operations';
import { Toaster } from 'react-hot-toast';

const HomePage = lazy(() => import('pages/HomePage'));
const Login = lazy(() => import('components/Login/Login'));
const Signup = lazy(() => import('components/Signup/Signup'));
const TaskPage = lazy(() => import('pages/TasksPage'));

const startData = { token: null };
const savedData = JSON.parse(localStorage.getItem('taskmgr'));

export const App = () => {
  const [data, setData] = useState(savedData ?? startData);
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState(null);
  const [token, setToken] = useState(data.token);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    checkCurrentUser(token)
      .then(data => {
        setUser(data.name);
        setEmail(data.email);
        setIsLoggedIn(true);
      })
      .catch(error => {});
  });

  useEffect(() => {
    setData({ token });
  }, [token]);

  useEffect(() => {
    localStorage.setItem('taskmgr', JSON.stringify(data));
  }, [data]);

  return (
    <ThemeProvider theme={theme}>
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

          <Route path="tasks" element={<TaskPage isLoggedIn={isLoggedIn} />} />
        </Route>
      </Routes>

      <Toaster
        position="top-center"
        toastOptions={{
          duration: 2000,
          
        }}
      />
    </ThemeProvider>
  );
};

import { useContext } from 'react';
import { TaskContext } from 'utils/context';
import { FormWrap, GreenLine, FormBox } from 'components/Login/Login.styled';
import { Navigate, Outlet } from 'react-router-dom';
import { Box } from 'components/Base/Box';
import logo from 'images/polysteel.webp';

export default function HomePage() {
  const { user } = useContext(TaskContext);

  return (
    <>
      {user.email && <Navigate to="/tasks/uncompleted" />}

      <FormWrap>
        <GreenLine></GreenLine>

        <FormBox>
          <Outlet />

          <Box mt={4}>
            <img src={logo} alt="logo" width="200" />
          </Box>
        </FormBox>
      </FormWrap>
    </>
  );
}

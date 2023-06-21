import { Box } from 'components/Base/Box';
import { Navigate } from 'react-router-dom';
import { TaskContext } from 'utils/context';
import { useContext } from 'react';
import Modal from 'components/Modal/Modal';
import { Loader } from 'components/Loader/Loader';

export default function AccountPage({ user, isLoggedIn }) {
  const { isLoading } = useContext(TaskContext);

  return (
    <>
      {!isLoggedIn && <Navigate to="/" />}

      <Box mt={5} mx="auto">
        User Account
      </Box>

      {isLoading && (
        <Modal>
          <Loader />
        </Modal>
      )}
    </>
  );
}

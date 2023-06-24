import { Box } from 'components/Base/Box';
import { Navigate } from 'react-router-dom';
import { TaskContext } from 'utils/context';
import { useContext } from 'react';
import Modal from 'components/Modal/Modal';
import { Loader } from 'components/Loader/Loader';
import { FormUserName } from 'components/FormAccount/FormUserName';
import { FormUserPass } from 'components/FormAccount/FormUserPass';
import { MdOutlineArrowBack } from 'react-icons/md';
import { BackLink } from 'components/FormAccount/FormAccount.styled';

export default function AccountPage({ email, setUser, isLoggedIn }) {
  const { isLoading } = useContext(TaskContext);

  return (
    <>
      {!isLoggedIn && <Navigate to="/" />}

      <Box mt={5} mx="auto">
        <FormUserName email={email} setUser={setUser} />

        <FormUserPass setUser={setUser} />

        <BackLink to="/tasks">
          <MdOutlineArrowBack size="24" />
          Back to tasks
        </BackLink>
      </Box>

      {isLoading && (
        <Modal>
          <Loader />
        </Modal>
      )}
    </>
  );
}

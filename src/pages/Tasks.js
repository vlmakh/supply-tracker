import { Box } from 'components/Box/Box';
import { TaskTable } from 'components/TaskTable/TaskTable';
import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { ModalWindow } from 'components/Modal/Modal.styled';
import { FormAddTask } from 'components/FormAddTask/FormAddTask';
import { getTasks } from 'utils/operations';

export default function TaskPage({ isLoggedIn }) {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowMhdal] = useState(false);

  useEffect(() => {
    getTasks()
      .then(data => {
        setTasks(data);
      })
      .catch(error => {})
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const handleModal = () => {
    setShowMhdal(!showModal);
  };

  return (
    <>
      {!isLoggedIn && <Navigate to="/" />}

      <Box width="1200px" mt={5} mx="auto">
        {!isLoading && tasks && <TaskTable tasks={tasks} />}

        <button type="button" onClick={handleModal}>
          Add task
        </button>

        {showModal && (
          <ModalWindow>
            <FormAddTask handleModal={handleModal} />
          </ModalWindow>
        )}
      </Box>
    </>
  );
}

import { Box } from 'components/Box/Box';
import { TaskTable } from 'components/TaskTable/TaskTable';
import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { ModalWindow } from 'components/Modal/Modal.styled';
import { FormAddTask } from 'components/FormAddTask/FormAddTask';
import { getTasks, addTask } from 'utils/operations';

export default function TaskPage({ isLoggedIn }) {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

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
    setShowModal(!showModal);
  };

  const handleAddTask = (newTask, resetForm) => {
    addTask(newTask)
      .then(data => {
        resetForm();
        handleModal();
        tasks.push(data);
      })
      .catch(e => console.log(e.message));
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
            <FormAddTask
              handleModal={handleModal}
              handleAddTask={handleAddTask}
            />
          </ModalWindow>
        )}
      </Box>
    </>
  );
}

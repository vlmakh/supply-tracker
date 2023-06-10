import { Box } from 'components/Base/Box';
import { TaskTable } from 'components/TaskTable/TaskTable';
import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import Modal from 'components/Modal/Modal';
import { FormTaskAdd } from 'components/FormTask/FormTaskAdd';
import { getTasks, addTask } from 'utils/operations';
import { AddTaskButton } from 'components/Base/Buttons.styled';

export default function TaskPage({ isLoggedIn }) {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showFormTaskAdd, setShowFormTaskAdd] = useState(false);

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
    setShowFormTaskAdd(!showFormTaskAdd);
  };

  const handleAddTask = (newTask, resetForm) => {
    addTask(newTask)
      .then(data => {
        console.log(data);
        resetForm();
        setShowFormTaskAdd(!showFormTaskAdd);
        tasks.push(data);
      })
      .catch(e => console.log(e.message));
  };

  return (
    <>
      {!isLoggedIn && <Navigate to="/" />}

      <Box width="1200px" mt={5} mx="auto">
        {!isLoading && tasks && <TaskTable tasks={tasks} />}

        <Box textAlign="center" p={4}>
          <AddTaskButton type="button" onClick={handleModal}>
            Add task
          </AddTaskButton>
        </Box>

        {showFormTaskAdd && (
          <Modal onClose={handleModal}>
            <FormTaskAdd
              handleModal={handleModal}
              handleAddTask={handleAddTask}
            />
          </Modal>
        )}
      </Box>
    </>
  );
}

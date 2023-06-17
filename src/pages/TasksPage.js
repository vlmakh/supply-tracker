import { Box } from 'components/Base/Box';
import { TaskTable } from 'components/TaskTable/TaskTable';
import { useState, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import Modal from 'components/Modal/Modal';
import { FormTaskAdd } from 'components/FormTask/FormTaskAdd';
import { addTask } from 'utils/operations';
import { AddTaskButton } from 'components/Base/Buttons.styled';
import { TaskContext } from 'utils/context';
import { Loader } from 'components/Loader/Loader';
import { MdOutlineAddCircleOutline } from 'react-icons/md';

export default function TaskPage({ isLoggedIn }) {
  const { dispatch, tasks, isLoading, setIsLoading } = useContext(TaskContext);
  const [showFormTaskAdd, setShowFormTaskAdd] = useState(false);

  const handleModal = () => {
    setShowFormTaskAdd(!showFormTaskAdd);
  };

  const handleAddTask = newTask => {
    // console.log('send:', newTask);
    setIsLoading(true);
    addTask(newTask)
      .then(data => {
        // console.log('return:', data);
        if (data._id) {
          setShowFormTaskAdd(!showFormTaskAdd);
          dispatch({ type: 'addTask', newTask: data });
        } else throw new Error();
      })
      .catch(e => console.log(e.message))
      .finally(() => setIsLoading(false));
  };

  return (
    <>
      {!isLoggedIn && <Navigate to="/" />}

      <Box mt={5} mx="auto">
        {!isLoading && tasks && <TaskTable />}

        <Box p={4}>
          <AddTaskButton type="button" onClick={handleModal}>
            <MdOutlineAddCircleOutline size="48" />
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

      {isLoading && (
        <Modal>
          <Loader />
        </Modal>
      )}
    </>
  );
}

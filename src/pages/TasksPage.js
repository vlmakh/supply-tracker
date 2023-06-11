import { Box } from 'components/Base/Box';
import { TaskTable } from 'components/TaskTable/TaskTable';
import { useState, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import Modal from 'components/Modal/Modal';
import { FormTaskAdd } from 'components/FormTask/FormTaskAdd';
import { addTask } from 'utils/operations';
import { AddTaskButton } from 'components/Base/Buttons.styled';
import { TaskContext } from 'utils/context';
// import { reducer } from 'utils/reducer';

export default function TaskPage({ isLoggedIn, isLoading }) {
  // const [tasks, dispatch] = useReducer(reducer, []);
  const { dispatch, tasks } = useContext(TaskContext);
  // const [isLoading, setIsLoading] = useState(true);
  const [showFormTaskAdd, setShowFormTaskAdd] = useState(false);

  const handleModal = () => {
    setShowFormTaskAdd(!showFormTaskAdd);
  };

  const handleAddTask = newTask => {
    addTask(newTask)
      .then(data => {
        if (data._id) {
          setShowFormTaskAdd(!showFormTaskAdd);
          dispatch({ type: 'addTask', newTask: data });
        } else throw new Error();
      })
      .catch(e => console.log(e.message));
  };

  return (
    <>
      {!isLoggedIn && <Navigate to="/" />}

      {/* <TaskContext.Provider value={{ dispatch, tasks }}> */}
      <Box width="1200px" mt={5} mx="auto">
        {!isLoading && tasks && <TaskTable />}

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
      {/* </TaskContext.Provider> */}
    </>
  );
}

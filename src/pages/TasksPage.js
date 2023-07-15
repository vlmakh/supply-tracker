import { useState, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { TaskContext } from 'utils/context';
import { addTask } from 'utils/operations';
import { Box } from 'components/Base/Box';
import { TaskTableWrap } from 'components/Container/Container.styled';
import { TaskTable } from 'components/TaskTable/TaskTable';
import Modal from 'components/Modal/Modal';
import { FormTaskAdd } from 'components/FormTask/FormTaskAdd';
import { AddTaskButton } from 'components/Base/Buttons.styled';
import { Loader } from 'components/Loader/Loader';
import { MdOutlineAddCircleOutline } from 'react-icons/md';
import { t } from 'i18next';

export default function TaskPage({ isLoggedIn }) {
  const { dispatch, tasks, isLoading, setIsLoading } = useContext(TaskContext);
  const [showFormTaskAdd, setShowFormTaskAdd] = useState(false);

  const handleModal = () => {
    setShowFormTaskAdd(!showFormTaskAdd);
  };

  const handleAddTask = newTask => {
    setIsLoading(true);

    addTask(newTask)
      .then(data => {
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

      <TaskTableWrap>
        {!isLoading && tasks && <TaskTable />}

        <Box p={4}>
          <AddTaskButton
            type="button"
            onClick={handleModal}
            aria-label={t('formTask.add')}
          >
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
      </TaskTableWrap>

      {isLoading && (
        <Modal>
          <Loader />
        </Modal>
      )}
    </>
  );
}

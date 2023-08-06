import { useState, useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { addTask } from 'utils/operations';
import { Box } from 'components/Base/Box';
import { MainWrap } from 'components/Container/Container.styled';
import { TaskTable } from 'components/TaskTable/TaskTable';
import Modal from 'components/Modal/Modal';
import { FormTaskAdd } from 'components/FormTask/FormTaskAdd';
import { AddTaskButton } from 'components/Base/Buttons.styled';
import { Loader } from 'components/Loader/Loader';
import { MdOutlineAddCircleOutline } from 'react-icons/md';
import { t } from 'i18next';
import { useUserStore, useTaskStore } from 'utils/store';

export default function TaskPage({ startDate, endDate, today }) {
  const user = useUserStore(state => state.user);

  const {
    tasks,
    hadleGetTasksByRange,
    hadleGetUncompletedTasksByRange,
    hadleGetTasksByDateOrder,
    hadleGetTasksByDateInvoice,
    hadleGetTasksByDatePayment,
    hadleGetTasksByDateETD,
    hadleGetTasksByDateETA,
    addNewTask,
    isLoading,
  } = useTaskStore(state => state);

  const [showFormTaskAdd, setShowFormTaskAdd] = useState(false);
  const { category } = useParams();

  useEffect(() => {
    const handleCategory = value => {
      switch (value) {
        case 'range':
          hadleGetTasksByRange(startDate, endDate);
          break;
        case 'uncompleted':
          hadleGetUncompletedTasksByRange(startDate, endDate);
          break;
        case 'today-order':
          hadleGetTasksByDateOrder(today);
          break;
        case 'today-invoice':
          hadleGetTasksByDateInvoice(today);
          break;
        case 'today-payment':
          hadleGetTasksByDatePayment(today);
          break;
        case 'today-etd':
          hadleGetTasksByDateETD(today);
          break;
        case 'today-eta':
          hadleGetTasksByDateETA(today);
          break;
        default:
          return;
      }
    };

    handleCategory(category);
  }, [
    category,
    endDate,
    hadleGetTasksByDateETA,
    hadleGetTasksByDateETD,
    hadleGetTasksByDateInvoice,
    hadleGetTasksByDateOrder,
    hadleGetTasksByDatePayment,
    hadleGetTasksByRange,
    hadleGetUncompletedTasksByRange,
    startDate,
    today,
  ]);

  const handleModal = () => {
    setShowFormTaskAdd(!showFormTaskAdd);
  };

  const handleAddTask = newTask => {
    // setIsLoading(true);

    addTask(newTask)
      .then(data => {
        if (data._id) {
          setShowFormTaskAdd(!showFormTaskAdd);
          // dispatch({ type: 'addTask', newTask: data });
          addNewTask(data);
        } else throw new Error();
      })
      .catch(e => console.log(e.message));
    // .finally(() => setIsLoading(false));
  };

  return (
    <>
      {!user.email && <Navigate to="/" />}

      <MainWrap>
        {tasks && <TaskTable />}

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
      </MainWrap>

      {isLoading && (
        <Modal>
          <Loader />
        </Modal>
      )}
    </>
  );
}

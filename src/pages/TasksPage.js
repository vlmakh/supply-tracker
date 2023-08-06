import { useState, useContext, useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { TaskContext } from 'utils/context';
import {
  addTask,
  getTasksByRange,
  getUncompletedTasksByRange,
  getTasksByDateOrder,
  getTasksByDateInvoice,
  getTasksByDatePayment,
  getTasksByDateETD,
  getTasksByDateETA,
} from 'utils/operations';
import { Box } from 'components/Base/Box';
import { MainWrap } from 'components/Container/Container.styled';
import { TaskTable } from 'components/TaskTable/TaskTable';
import Modal from 'components/Modal/Modal';
import { FormTaskAdd } from 'components/FormTask/FormTaskAdd';
import { AddTaskButton } from 'components/Base/Buttons.styled';
import { Loader } from 'components/Loader/Loader';
import { MdOutlineAddCircleOutline } from 'react-icons/md';
import { t } from 'i18next';

import { useUserStore } from 'utils/store';

export default function TaskPage({ startDate, endDate, today }) {
  const user = useUserStore(state => state.user);

  const { dispatch, tasks, isLoading } = useContext(TaskContext);

  const [showFormTaskAdd, setShowFormTaskAdd] = useState(false);
  const { category } = useParams();

  useEffect(() => {
    const hadleGetTasksByRange = (start, end) => {
      // setIsLoading(true);

      getTasksByRange(start, end)
        .then(tasks => {
          dispatch({ type: 'getTasks', tasks });
        })
        .catch(error => console.log(error))
        .finally(() => {
          // setIsLoading(false);
        });
    };

    const hadleGetUncompletedTasksByRange = (start, end) => {
      // setIsLoading(true);

      getUncompletedTasksByRange(start, end)
        .then(tasks => {
          dispatch({ type: 'getTasks', tasks });
        })
        .catch(error => console.log(error))
        .finally(() => {
          // setIsLoading(false);
        });
    };

    const hadleGetTasksByDateOrder = start => {
      // setIsLoading(true);

      getTasksByDateOrder(start)
        .then(tasks => {
          dispatch({ type: 'getTasks', tasks });
        })
        .catch(error => console.log(error))
        .finally(() => {
          // setIsLoading(false);
        });
    };

    const hadleGetTasksByDateInvoice = start => {
      // setIsLoading(true);

      getTasksByDateInvoice(start)
        .then(tasks => {
          dispatch({ type: 'getTasks', tasks });
        })
        .catch(error => console.log(error))
        .finally(() => {
          // setIsLoading(false);
        });
    };

    const hadleGetTasksByDatePayment = start => {
      // setIsLoading(true);

      getTasksByDatePayment(start)
        .then(tasks => {
          dispatch({ type: 'getTasks', tasks });
        })
        .catch(error => console.log(error))
        .finally(() => {
          // setIsLoading(false);
        });
    };

    const hadleGetTasksByDateETD = start => {
      // setIsLoading(true);

      getTasksByDateETD(start)
        .then(tasks => {
          dispatch({ type: 'getTasks', tasks });
        })
        .catch(error => console.log(error))
        .finally(() => {
          // setIsLoading(false);
        });
    };

    const hadleGetTasksByDateETA = start => {
      // setIsLoading(true);

      getTasksByDateETA(start)
        .then(tasks => {
          dispatch({ type: 'getTasks', tasks });
        })
        .catch(error => console.log(error))
        .finally(() => {
          // setIsLoading(false);
        });
    };

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
  }, [category, dispatch, endDate, startDate, today]);

  const handleModal = () => {
    setShowFormTaskAdd(!showFormTaskAdd);
  };

  const handleAddTask = newTask => {
    // setIsLoading(true);

    addTask(newTask)
      .then(data => {
        if (data._id) {
          setShowFormTaskAdd(!showFormTaskAdd);
          dispatch({ type: 'addTask', newTask: data });
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

import { FC, useState, useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import { Box } from "components/Base/Box";
import { MainWrap } from "components/Container/Container.styled";
import { TaskTable } from "components/TaskTable/TaskTable";
import Modal from "components/Modal/Modal";
import { FormTaskAdd } from "components/FormTask/FormTaskAdd";
import { AddTaskButton } from "components/Base/Buttons.styled";
import { Loader } from "components/Loader/Loader";
import { MdOutlineAddCircleOutline } from "react-icons/md";
import { t } from "i18next";
import { useUserStore, useTaskStore } from "utils/store";
import { ITask } from "components/types";

type Props = {
  startDate: Date;
  endDate: Date;
  today: Date;
};

const TaskPage: FC<Props> = ({ startDate, endDate, today }) => {
  const user = useUserStore((state) => state.user);

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
  } = useTaskStore((state) => state);

  const [showFormTaskAdd, setShowFormTaskAdd] = useState(false);
  const { category } = useParams();

  useEffect(() => {
    const handleCategory = (value: string | undefined) => {
      switch (value) {
        case "range":
          hadleGetTasksByRange(startDate.toString(), endDate.toString());
          break;
        case "uncompleted":
          hadleGetUncompletedTasksByRange(
            startDate.toString(),
            endDate.toString()
          );
          break;
        case "today-order":
          hadleGetTasksByDateOrder(today.toString());
          break;
        case "today-invoice":
          hadleGetTasksByDateInvoice(today.toString());
          break;
        case "today-payment":
          hadleGetTasksByDatePayment(today.toString());
          break;
        case "today-etd":
          hadleGetTasksByDateETD(today.toString());
          break;
        case "today-eta":
          hadleGetTasksByDateETA(today.toString());
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

  const toggleModal = () => {
    setShowFormTaskAdd(!showFormTaskAdd);
  };

  const handleAddTask = (newTask: Partial<ITask>) => {
    addNewTask(newTask);
  };

  return (
    <>
      {!user.email && <Navigate to="/" />}

      <MainWrap>
        {tasks && <TaskTable />}

        <Box p={4}>
          <AddTaskButton
            type="button"
            onClick={toggleModal}
            aria-label={t("formTask.add")}
          >
            <MdOutlineAddCircleOutline size="48" />
          </AddTaskButton>
        </Box>

        {showFormTaskAdd && (
          <Modal onClose={toggleModal}>
            <FormTaskAdd
              toggleModal={toggleModal}
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
};

export default TaskPage;

import { FormStyled, FormTitle } from './FormTask.styled';
import { useState, useEffect, useContext } from 'react';
import { Formik } from 'formik';
import { IoClose } from 'react-icons/io5';
import { CloseButton, AddTaskFormButton } from 'components/Base/Buttons.styled';
import { FormCommon } from './FormCommon';
import { updateTask } from 'utils/operations';
import { TaskContext } from 'utils/context';

export const FormTaskEdit = ({ handleEditTask, task }) => {
  const [dateOrder, setDateOrder] = useState(new Date());

  const { dispatch } = useContext(TaskContext);

  useEffect(() => {
    window.addEventListener('keydown', handleEscape);

    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  });

  const handleSubmit = newTask => {
    updateTask(task._id, newTask)
      .then(data => {
        dispatch({ type: 'editTask', newTask: data, taskId: task._id });

        handleEditTask();
      })
      .catch(err => console.log(err.message));
  };

  const handleEscape = event => {
    if (event.code === 'Escape') {
      handleEditTask();
    }
  };

  return (
    <Formik
      onSubmit={handleSubmit}
      initialValues={{
        name: task.name,
        qty: task.qty,
        unit: task.unit,
        dateOrder,
        supplier: task.supplier,
        dateInvoice: task.dateInvoice,
        datePayment: task.datePayment,
        freight: task.freight,
        dateETD: task.dateETD || '-',
        dateETA: task.dateETA,
        comments: task.comments,
      }}
    >
      <FormStyled>
        <CloseButton type="button" onClick={handleEditTask}>
          <IoClose size="20" />
        </CloseButton>

        <FormTitle>Edit task</FormTitle>

        <FormCommon dateOrder={dateOrder} setDateOrder={setDateOrder} />

        <AddTaskFormButton type="submit">Save</AddTaskFormButton>
      </FormStyled>
    </Formik>
  );
};

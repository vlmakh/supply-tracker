import { FormStyled, FormTitle } from './FormTask.styled';
import { useState, useEffect, useContext } from 'react';
import { Formik } from 'formik';
import { IoClose } from 'react-icons/io5';
import { CloseButton, AddTaskFormButton } from 'components/Base/Buttons.styled';
import { FormCommon } from './FormCommon';
import { updateTask } from 'utils/operations';
import { TaskContext } from 'utils/context';

export const FormTaskEdit = ({ handleEditTask, task }) => {
  const [dateOrder, setDateOrder] = useState(Date.parse(task.dateOrder));
  const [dateInvoice, setDateInvoice] = useState(Date.parse(task.dateInvoice));
  const [datePayment, setDatePayment] = useState(Date.parse(task.datePayment));
  const [dateETD, setDateETD] = useState(Date.parse(task.dateETD));
  const [dateETA, setDateETA] = useState(Date.parse(task.dateETA));

  const { dispatch, setIsLoading } = useContext(TaskContext);

  useEffect(() => {
    window.addEventListener('keydown', handleEscape);

    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  });

  const handleSubmit = newTask => {
    setIsLoading(true);
    updateTask(task._id, {
      ...newTask,
      dateOrder,
      dateInvoice,
      datePayment,
      dateETD,
      dateETA,
    })
      .then(data => {
        dispatch({ type: 'editTask', newTask: data, taskId: task._id });

        handleEditTask();
      })
      .catch(err => console.log(err.message))
      .finally(() => setIsLoading(false));
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
        dateInvoice,
        datePayment,
        freight: task.freight,
        dateETD,
        dateETA,
        comments: task.comments,
      }}
    >
      <FormStyled>
        <CloseButton type="button" onClick={handleEditTask}>
          <IoClose size="20" />
        </CloseButton>

        <FormTitle>Edit task</FormTitle>

        <FormCommon
          dateOrder={dateOrder}
          setDateOrder={setDateOrder}
          dateInvoice={dateInvoice}
          setDateInvoice={setDateInvoice}
          datePayment={datePayment}
          setDatePayment={setDatePayment}
          dateETD={dateETD}
          setDateETD={setDateETD}
          dateETA={dateETA}
          setDateETA={setDateETA}
        />

        <AddTaskFormButton type="submit">Save</AddTaskFormButton>
      </FormStyled>
    </Formik>
  );
};

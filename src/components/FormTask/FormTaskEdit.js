import { FormStyled, FormTitle } from './FormTask.styled';
import { useState, useEffect, useContext } from 'react';
import { Formik } from 'formik';
import { IoClose } from 'react-icons/io5';
import { CloseButton, AddTaskFormButton } from 'components/Base/Buttons.styled';
import { FormCommon } from './FormCommon';
import { updateTask } from 'utils/operations';
import { TaskContext } from 'utils/context';
import { schema } from './yupSchema';

export const FormTaskEdit = ({ handleEditTask, task }) => {
  const [dates, setDates] = useState({
    dateOrder: Date.parse(task.dateOrder),
    dateInvoice: Date.parse(task.dateInvoice),
    datePayment: Date.parse(task.datePayment),
    dateETD: Date.parse(task.dateETD),
    dateETA: Date.parse(task.dateETA),
  });

  const { dateOrder, dateInvoice, datePayment, dateETD, dateETA } = dates;

  const { dispatch, setIsLoading } = useContext(TaskContext);

  useEffect(() => {
    window.addEventListener('keydown', handleEscape);

    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  });

  const handleSubmit = newTask => {
    setIsLoading(true);
    // console.log('send:', newTask);
    updateTask(task._id, {
      ...newTask,
      dateOrder,
      dateInvoice,
      datePayment,
      dateETD,
      dateETA,
    })
      .then(data => {
        // console.log('return:', data);
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
      validationSchema={schema}
    >
      <FormStyled>
        <CloseButton type="button" onClick={handleEditTask}>
          <IoClose size="20" />
        </CloseButton>

        <FormTitle>Edit task</FormTitle>

        <FormCommon dates={dates} setDates={setDates} />

        <AddTaskFormButton type="submit">Save</AddTaskFormButton>
      </FormStyled>
    </Formik>
  );
};

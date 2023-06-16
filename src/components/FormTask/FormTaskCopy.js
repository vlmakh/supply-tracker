import { FormStyled, FormTitle } from './FormTask.styled';
// import { formatDate } from 'utils/formatDate';
import { useState, useEffect, useContext } from 'react';
import { Formik } from 'formik';
import { IoClose } from 'react-icons/io5';
import { CloseButton, AddTaskFormButton } from 'components/Base/Buttons.styled';
import { schema } from './yupSchema';
import { FormCommon } from './FormCommon';
import { addTask } from 'utils/operations';
import { TaskContext } from 'utils/context';

export const FormTaskCopy = ({ handleCopyTask, task }) => {
  const today = new Date();
  const [dateOrder, setDateOrder] = useState(today);
  const [dateInvoice, setDateInvoice] = useState(today.getTime() + 86_400_000);
  const [datePayment, setDatePayment] = useState(
    today.getTime() + 2 * 86_400_000
  );
  const [dateETD, setDateETD] = useState(today.getTime() + 3 * 86_400_000);
  const [dateETA, setDateETA] = useState(today.getTime() + 4 * 86_400_000);
  const { dispatch, setIsLoading } = useContext(TaskContext);

  useEffect(() => {
    window.addEventListener('keydown', handleEscape);

    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  });

  const handleSubmit = newTask => {
    console.log('send:', newTask);
    setIsLoading(true);
    addTask({
      ...newTask,
      dateOrder,
      dateInvoice,
      datePayment,
      dateETD,
      dateETA,
    })
      .then(data => {
        console.log('return:', data);

        if (data._id) {
          handleCopyTask();

          dispatch({ type: 'addTask', newTask: data });
        } else throw new Error();
      })
      .catch(e => console.log(e.message))
      .finally(() => setIsLoading(false));
  };

  const handleEscape = event => {
    if (event.code === 'Escape') {
      handleCopyTask();
    }
  };

  // const today = new Date();
  // const dateInvoice = new Date(today.getTime() + 86_400_000);
  // const datePayment = new Date(today.getTime() + 2 * 86_400_000);
  // const dateETD = new Date(today.getTime() + 3 * 86_400_000);
  // const dateETA = new Date(today.getTime() + 4 * 86_400_000);

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
        <CloseButton type="button" onClick={handleCopyTask}>
          <IoClose size="20" />
        </CloseButton>

        <FormTitle>Add new task</FormTitle>

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

        <AddTaskFormButton type="submit">Add</AddTaskFormButton>
      </FormStyled>
    </Formik>
  );
};

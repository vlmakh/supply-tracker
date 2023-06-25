import { FormStyled, FormTitle, AddTaskFormButton } from './FormTask.styled';
import { useState, useEffect, useContext } from 'react';
import { Formik } from 'formik';
import { IoClose } from 'react-icons/io5';
import { CloseButton } from 'components/Base/Buttons.styled';
import { schema } from './yupSchema';
import { FormCommon } from './FormCommon';
import { addTask } from 'utils/operations';
import { TaskContext } from 'utils/context';
import { t } from 'i18next';

export const FormTaskCopy = ({ handleCopyTask, task }) => {
  const today = new Date();

  const [dates, setDates] = useState({
    dateOrder: today,
    dateInvoice: today.getTime() + 86_400_000,
    datePayment: today.getTime() + 2 * 86_400_000,
    dateETD: today.getTime() + 3 * 86_400_000,
    dateETA: today.getTime() + 4 * 86_400_000,
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
    // console.log('send:', newTask);
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
        // console.log('return:', data);

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

        <FormTitle>{t('formTask.add')}</FormTitle>

        <FormCommon dates={dates} setDates={setDates} />

        <AddTaskFormButton type="submit">{t('buttons.add')}</AddTaskFormButton>
      </FormStyled>
    </Formik>
  );
};

import { useState, useEffect, useContext } from 'react';
import { updateTask } from 'utils/operations';
import { TaskContext } from 'utils/context';
import { FormStyled, FormTitle, AddTaskFormButton } from './FormTask.styled';
import { Formik } from 'formik';
import { CloseButton } from 'components/Base/Buttons.styled';
import { FormCommon } from './FormCommon';
import { schema } from './yupSchema';
import { IoClose } from 'react-icons/io5';
import { t } from 'i18next';

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
      validationSchema={schema}
    >
      <FormStyled>
        <CloseButton type="button" onClick={handleEditTask}>
          <IoClose size="20" />
        </CloseButton>

        <FormTitle>{t('formTask.edit')}</FormTitle>

        <FormCommon dates={dates} setDates={setDates} />

        <AddTaskFormButton type="submit">{t('buttons.save')}</AddTaskFormButton>
      </FormStyled>
    </Formik>
  );
};

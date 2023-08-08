import { useState, useEffect } from 'react';
import { FormStyled, FormTitle, AddTaskFormButton } from './FormTask.styled';
import { Formik } from 'formik';
import { CloseButton } from 'components/Base/Buttons.styled';
import { schema } from './yupSchema';
import { FormCommon } from './FormCommon';
import { IoClose } from 'react-icons/io5';
import { t } from 'i18next';
import { useTaskStore } from 'utils/store';

export const FormTaskCopy = ({ toggleCopyWindow, task }) => {
  const today = new Date();

  const [dates, setDates] = useState({
    dateOrder: today,
    dateInvoice: today.getTime() + 86_400_000,
    datePayment: today.getTime() + 2 * 86_400_000,
    dateETD: today.getTime() + 3 * 86_400_000,
    dateETA: today.getTime() + 4 * 86_400_000,
  });

  const { dateOrder, dateInvoice, datePayment, dateETD, dateETA } = dates;

  const { addNewTask } = useTaskStore(state => state);

  useEffect(() => {
    window.addEventListener('keydown', handleEscape);

    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  });

  const handleSubmit = newTask => {
    addNewTask({
      ...newTask,
      dateOrder,
      dateInvoice,
      datePayment,
      dateETD,
      dateETA,
    });

    toggleCopyWindow();
  };

  const handleEscape = event => {
    if (event.code === 'Escape') {
      toggleCopyWindow();
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
        <CloseButton type="button" onClick={toggleCopyWindow}>
          <IoClose size="20" />
        </CloseButton>

        <FormTitle>{t('formTask.add')}</FormTitle>

        <FormCommon dates={dates} setDates={setDates} />

        <AddTaskFormButton type="submit">{t('buttons.add')}</AddTaskFormButton>
      </FormStyled>
    </Formik>
  );
};

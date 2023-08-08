import { useState, useEffect } from 'react';
import { FormStyled, FormTitle, AddTaskFormButton } from './FormTask.styled';
import { Formik } from 'formik';
import { CloseButton } from 'components/Base/Buttons.styled';
import { FormCommon } from './FormCommon';
import { schema } from './yupSchema';
import { IoClose } from 'react-icons/io5';
import { t } from 'i18next';
import { useTaskStore } from 'utils/store';

export const FormTaskEdit = ({ toggleEditWindow, task }) => {
  const [dates, setDates] = useState({
    dateOrder: Date.parse(task.dateOrder),
    dateInvoice: Date.parse(task.dateInvoice),
    datePayment: Date.parse(task.datePayment),
    dateETD: Date.parse(task.dateETD),
    dateETA: Date.parse(task.dateETA),
  });

  const { dateOrder, dateInvoice, datePayment, dateETD, dateETA } = dates;

  const { handleUpdateTask } = useTaskStore(state => state);

  useEffect(() => {
    window.addEventListener('keydown', handleEscape);

    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  });

  const handleSubmit = newTask => {
    const data = {
      newTask,
      dateOrder,
      dateInvoice,
      datePayment,
      dateETD,
      dateETA,
    };
    handleUpdateTask(task._id, data);

    toggleEditWindow();
  };

  const handleEscape = event => {
    if (event.code === 'Escape') {
      toggleEditWindow();
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
        <CloseButton type="button" onClick={toggleEditWindow}>
          <IoClose size="20" />
        </CloseButton>

        <FormTitle>{t('formTask.edit')}</FormTitle>

        <FormCommon dates={dates} setDates={setDates} />

        <AddTaskFormButton type="submit">{t('buttons.save')}</AddTaskFormButton>
      </FormStyled>
    </Formik>
  );
};

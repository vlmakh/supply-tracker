import { FormStyled, FormTitle, AddTaskFormButton } from './FormTask.styled';
import { useState, useEffect } from 'react';
import { Formik } from 'formik';
import { IoClose } from 'react-icons/io5';
import { CloseButton } from 'components/Base/Buttons.styled';
import { schema } from './yupSchema';
import { FormCommon } from './FormCommon';
import { t } from 'i18next';

export const FormTaskAdd = ({ handleModal, handleAddTask }) => {
  const today = new Date();

  const [dates, setDates] = useState({
    dateOrder: today,
    dateInvoice: today.getTime() + 86_400_000,
    datePayment: today.getTime() + 2 * 86_400_000,
    dateETD: today.getTime() + 3 * 86_400_000,
    dateETA: today.getTime() + 4 * 86_400_000,
  });

  const { dateOrder, dateInvoice, datePayment, dateETD, dateETA } = dates;

  useEffect(() => {
    window.addEventListener('keydown', handleEscape);

    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  });

  const handleSubmit = (newTask, { resetForm }) => {
    handleAddTask(
      { ...newTask, dateOrder, dateInvoice, datePayment, dateETD, dateETA },
      resetForm
    );
  };

  const handleEscape = event => {
    if (event.code === 'Escape') {
      handleModal();
    }
  };

  return (
    <Formik
      onSubmit={handleSubmit}
      initialValues={{
        name: '',
        qty: '',
        unit: 'pcs',
        dateOrder,
        supplier: '-',
        dateInvoice,
        datePayment,
        freight: 'Nova poshta',
        dateETD,
        dateETA,
        comments: '-',
      }}
      validationSchema={schema}
    >
      <FormStyled>
        <CloseButton type="button" onClick={handleModal}>
          <IoClose size="20" />
        </CloseButton>

        <FormTitle>{t('formTask.add')}</FormTitle>

        <FormCommon dates={dates} setDates={setDates} />

        <AddTaskFormButton type="submit">{t('buttons.add')}</AddTaskFormButton>
      </FormStyled>
    </Formik>
  );
};

import { FormStyled, FormTitle } from './FormTask.styled';
// import { formatDate } from 'utils/formatDate';
import { useState, useEffect } from 'react';
import { Formik } from 'formik';
import { IoClose } from 'react-icons/io5';
import { CloseButton, AddTaskFormButton } from 'components/Base/Buttons.styled';
import { schema } from './yupSchema';
import { FormCommon } from './FormCommon';

export const FormTaskAdd = ({ handleModal, handleAddTask }) => {
  const today = new Date();

  const [dateOrder, setDateOrder] = useState(today);
  const [dateInvoice, setDateInvoice] = useState(today.getTime() + 86_400_000);
  const [datePayment, setDatePayment] = useState(
    today.getTime() + 2 * 86_400_000
  );
  const [dateETD, setDateETD] = useState(today.getTime() + 3 * 86_400_000);
  const [dateETA, setDateETA] = useState(today.getTime() + 4 * 86_400_000);

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

import { FormStyled, FormTitle } from './FormTask.styled';
import { formatDate } from 'utils/formatDate';
import { useState, useEffect } from 'react';
import { Formik } from 'formik';
import { IoClose } from 'react-icons/io5';
import { CloseButton, AddTaskFormButton } from 'components/Base/Buttons.styled';
import { schema } from './yupSchema';
import { FormCommon } from './FormCommon';

export const FormTaskAdd = ({ handleModal, handleAddTask }) => {
  const [dateOrder, setDateOrder] = useState(new Date());

  useEffect(() => {
    window.addEventListener('keydown', handleEscape);

    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  });

  const handleSubmit = (newTask, { resetForm }) => {
    handleAddTask(newTask, resetForm);
  };

  const handleEscape = event => {
    if (event.code === 'Escape') {
      handleModal();
    }
  };

  const today = new Date();
  const dateInvoice = new Date(today.getTime() + 86_400_000);
  const datePayment = new Date(today.getTime() + 2 * 86_400_000);
  const dateETD = new Date(today.getTime() + 3 * 86_400_000);
  const dateETA = new Date(today.getTime() + 4 * 86_400_000);

  return (
    <Formik
      onSubmit={handleSubmit}
      initialValues={{
        name: '',
        qty: '',
        unit: 'pcs',
        dateOrder,
        supplier: '-',
        dateInvoice: formatDate(dateInvoice),
        datePayment: formatDate(datePayment),
        freight: 'Nova poshta',
        dateETD: formatDate(dateETD),
        dateETA: formatDate(dateETA),
        comments: '-',
      }}
      validationSchema={schema}
    >
      <FormStyled>
        <CloseButton type="button" onClick={handleModal}>
          <IoClose size="20" />
        </CloseButton>

        <FormTitle>Add new task</FormTitle>

        <FormCommon dateOrder={dateOrder} setDateOrder={setDateOrder} />

        <AddTaskFormButton type="submit">Add</AddTaskFormButton>
      </FormStyled>
    </Formik>
  );
};

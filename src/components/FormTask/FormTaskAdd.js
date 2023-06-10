import { FormStyled, FormTitle } from './FormTask.styled';
import { formatDate } from 'utils/formatDate';
import { useEffect } from 'react';
import { Formik } from 'formik';
import { IoClose } from 'react-icons/io5';
import { CloseButton, AddTaskFormButton } from 'components/Base/Buttons.styled';
import * as yup from 'yup';
import { FormCommon } from './FormCommon';

let schema = yup.object().shape({
  name: yup.string().required(),
  qty: yup.number().required(),
  unit: yup.string(),
  dateOrder: yup.string().required(),
  supplier: yup.string(),
  dateInvoice: yup.string(),
  datePayment: yup.string(),
  freight: yup.string(),
  dateETD: yup.string(),
  dateETA: yup.string().required(),
  comments: yup.string(),
});

export const FormTaskAdd = ({ handleModal, handleAddTask }) => {
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
        dateOrder: formatDate(today),
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

        <FormCommon />

        <AddTaskFormButton type="submit">Add</AddTaskFormButton>
      </FormStyled>
    </Formik>
  );
};

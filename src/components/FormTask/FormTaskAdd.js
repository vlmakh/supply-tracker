import {
  FormStyled,
  FieldName,
  Input,
  DateInput,
  Comments,
  FormField,
  FormTitle,
} from './FormTask.styled';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
import { formatDate } from 'utils/formatDate';
import { useEffect } from 'react';
import { Formik, Field } from 'formik';
import { IoClose } from 'react-icons/io5';
import { CloseButton, AddTaskFormButton } from 'components/Base/Buttons.styled';
import { Box } from 'components/Base/Box';

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
        supplier: ' ',
        dateInvoice: formatDate(dateInvoice),
        datePayment: formatDate(datePayment),
        freight: 'Nova poshta',
        dateETD: formatDate(dateETD),
        dateETA: formatDate(dateETA),
        comments: ' ',
      }}
    >
      <FormStyled>
        <CloseButton type="button" onClick={handleModal}>
          <IoClose size="20" />
        </CloseButton>

        <FormTitle>Add new task</FormTitle>

        <FormField>
          <FieldName>Name</FieldName>
          <Input type="text" name="name" placeholder="name"></Input>
        </FormField>

        <FormField>
          <FieldName>Quantity</FieldName>

          <Input type="text" name="qty" placeholder="quantity"></Input>

          <Field as="select" name="unit">
            <option value="pcs">pcs</option>
            <option value="m">m</option>
            <option value="kg">kg</option>
          </Field>
        </FormField>

        <FormField>
          <FieldName>Order</FieldName>
          <DateInput type="text" name="dateOrder"></DateInput>
        </FormField>

        <FormField>
          <FieldName>Supplier</FieldName>
          <Input type="text" name="supplier"></Input>
        </FormField>

        <Box display="flex" alignItems="center">
          <FormField>
            <FieldName>Invoice</FieldName>
            <DateInput type="text" name="dateInvoice"></DateInput>
          </FormField>

          <FormField>
            <FieldName>Payment</FieldName>
            <DateInput type="text" name="datePayment"></DateInput>
          </FormField>
        </Box>

        <FormField>
          <FieldName>Freight</FieldName>

          <Input as="select" name="freight">
            <option value="Nova poshta">Nova poshta</option>
            <option value="FCA">FCA</option>
            <option value="DAP">DAP</option>
            <option value="SAT">SAT</option>
            <option value="Delivery">Delivery</option>
          </Input>
        </FormField>

        <Box display="flex" alignItems="center">
          <FormField>
            <FieldName>ETD</FieldName>
            <DateInput type="text" name="dateETD"></DateInput>
          </FormField>

          <FormField>
            <FieldName>ETA</FieldName>
            <DateInput type="text" name="dateETA"></DateInput>
          </FormField>
        </Box>

        <FormField>
          <FieldName>Comments</FieldName>
          <Comments as="textarea" rows="4" name="comments"></Comments>
        </FormField>

        <AddTaskFormButton type="submit">Add</AddTaskFormButton>
      </FormStyled>
    </Formik>
  );
};

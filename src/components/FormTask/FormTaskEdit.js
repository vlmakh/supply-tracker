import { Box } from 'components/Base/Box';
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
import { useEffect } from 'react';
import { Formik, Field } from 'formik';
import { IoClose } from 'react-icons/io5';
import { CloseButton, AddTaskButton } from 'components/Base/Buttons.styled';

export const FormTaskEdit = ({ handleModal, handleEditTask, task }) => {
  useEffect(() => {
    window.addEventListener('keydown', handleEscape);

    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  });

  const handleSubmit = (newTask, { resetForm }) => {
    handleEditTask(newTask, resetForm);
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
        name: task.name,
        qty: task.qty,
        unit: task.unit,
        dateOrder: task.dateOrder,
        supplier: task.supplier,
        dateInvoice: task.dateInvoice,
        datePayment: task.datePayment,
        freight: task.freight,
        dateETD: task.dateETD,
        dateETA: task.dateETA,
        comments: task.comments,
      }}
    >
      <FormStyled>
        <CloseButton type="button" onClick={handleModal}>
          <IoClose size="20" />
        </CloseButton>

        <FormTitle>Edit task</FormTitle>

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

        <AddTaskButton type="submit">Save</AddTaskButton>
      </FormStyled>
    </Formik>
  );
};

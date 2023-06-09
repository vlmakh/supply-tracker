import { FormStyled, FieldName, FormField } from './FormAddTask.styled';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
import { formatDate } from 'utils/formatDate';
import { useEffect } from 'react';
import { Formik, Field } from 'formik';
// import { addTask } from 'utils/operations';

export const FormAddTask = ({ handleModal, handleAddTask }) => {
  useEffect(() => {
    window.addEventListener('keydown', handleEscape);

    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  });

  const handleSubmit = (newTask, { resetForm }) => {
    // addTask(newTask)
    //   .then(() => {
    //     resetForm();
    //     handleModal();
    //   })
    //   .catch(e => console.log(e.message));

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
        supplier: '',
        dateInvoice: formatDate(dateInvoice),
        datePayment: formatDate(datePayment),
        dateETD: formatDate(dateETD),
        dateETA: formatDate(dateETA),
        // comments: '',
      }}
    >
      <FormStyled>
        <button type="button" onClick={handleModal}>
          X
        </button>

        <p>Add new task</p>

        <FormField>
          <FieldName>Name</FieldName>
          <Field type="text" name="name" placeholder="name"></Field>
        </FormField>

        <FormField>
          <FieldName>Quantity</FieldName>

          <Field type="text" name="qty" placeholder="quantity"></Field>

          <Field as="select" name="unit">
            <option value="pcs">pcs</option>
            <option value="m">m</option>
            <option value="kg">kg</option>
          </Field>
        </FormField>

        <FormField>
          <FieldName>Order</FieldName>
          <Field type="text" name="dateOrder"></Field>
        </FormField>

        <FormField>
          <FieldName>Supplier</FieldName>
          <Field type="text" name="supplier"></Field>
        </FormField>

        <FormField>
          <FieldName>Invoice</FieldName>
          <Field type="text" name="dateInvoice"></Field>
        </FormField>

        <FormField>
          <FieldName>Payment</FieldName>
          <Field type="text" name="datePayment"></Field>
        </FormField>

        <FormField>
          <FieldName>Freight</FieldName>

          <Field as="select" name="delivery">
            <option value="Nova poshta">Nova poshta</option>
            <option value="FCA">FCA</option>
            <option value="DAP">DAP</option>
            <option value="SAT">SAT</option>
            <option value="Delivery">Delivery</option>
          </Field>
        </FormField>

        <FormField>
          <FieldName>ETD</FieldName>
          <Field type="text" name="dateETD"></Field>
        </FormField>

        <FormField>
          <FieldName>ETA</FieldName>
          <Field type="text" name="dateETA"></Field>
        </FormField>

        {/* <FormField>
          <FieldName>Comments</FieldName>
          <Field type="text" name="comments"></Field>
        </FormField> */}

        <button type="submit">Add</button>
      </FormStyled>
    </Formik>
  );
};

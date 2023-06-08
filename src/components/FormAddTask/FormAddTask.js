import { FormStyled, FormField } from './FormAddTask.styled';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
import { formatDate } from 'utils/formatDate';
import { useEffect } from 'react';
import { Formik, Field } from 'formik';

export const FormAddTask = ({ handleModal }) => {
  useEffect(() => {
    window.addEventListener('keydown', handleEscape);

    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  });

  const handleSubmit = () => {};

  const handleEscape = event => {
    if (event.code === 'Escape') {
      handleModal();
    }
  };

  const today = new Date();
  const dateInvoice = new Date(today.getTime() + 86_400_000);

  return (
    <Formik
      onSubmit={handleSubmit}
      initialValues={{
        name: '',
        qty: '',
        dateOrder: formatDate(today),
        dateInvoice: formatDate(dateInvoice),
        datePayment: '',
        dateETD: '',
        dateETA: '',
      }}
    >
      <FormStyled>
        <button type="button" onClick={handleModal}>
          X
        </button>

        <p>Add new task</p>

        <FormField>
          <span>Name</span>
          <Field type="text" name="name" placeholder="name"></Field>
        </FormField>

        <FormField>
          <span>Quantuty</span>
          <Field type="text" name="qty" placeholder="quantity"></Field>
          <Field as="select" name="unit">
            <option value="pcs">pcs</option>
            <option value="m">m</option>
            <option value="kg">kg</option>
          </Field>
        </FormField>

        <FormField>
          <span>Order</span>
          <Field type="text" name="dateOrder"></Field>
        </FormField>

        <FormField>
          <span>Invoice</span>
          <Field type="text" name="dateInvoice"></Field>
          <p>{formatDate(dateInvoice)}</p>
        </FormField>

        <FormField>
          <span>Payment</span>
          <Field type="text" name="datePayment"></Field>
          <p>{formatDate(dateInvoice)}</p>
        </FormField>

        <FormField>
          <span>Delivery</span>

          <Field as="select" name="delivery">
            <option value="Nova poshta">Nova poshta</option>
            <option value="FCA">FCA</option>
            <option value="DAP">DAP</option>
            <option value="DAP">SAT</option>
            <option value="DAP">Delivery</option>
          </Field>
        </FormField>

        <FormField>
          <span>ETD</span>
          <Field type="text" name="dateETD"></Field>
          <p>{formatDate(dateInvoice)}</p>
        </FormField>

        <FormField>
          <span>ETA</span>
          <Field type="text" name="dateETA"></Field>
          <p>{formatDate(dateInvoice)}</p>
        </FormField>

        <button type="submit">Add</button>
      </FormStyled>
    </Formik>
  );
};

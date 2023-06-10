import { Box } from 'components/Base/Box';
import {
  FieldName,
  Input,
  DateInput,
  Comments,
  FormField,
} from './FormTask.styled';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
import { Field } from 'formik';

export const FormCommon = () => {
  return (
    <>
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
    </>
  );
};

import {
  FieldName,
  Input,
  Qty,
  Unit,
  Comments,
  FormField,
  ErrorStyled,
  DatePickerStyled,
} from './FormTask.styled';
import { Field } from 'formik';
// import { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
// import uk from 'date-fns/locale/uk';

export const FormCommon = ({
  dateOrder,
  setDateOrder,
  dateInvoice,
  setDateInvoice,
  datePayment,
  setDatePayment,
  dateETD,
  setDateETD,
  dateETA,
  setDateETA,
}) => {
  // const DatepickerField = ({ field, form, ...props }) => (
  //   <div>
  //     <DatePickerStyled
  //       dateFormat="dd.MM.yyyy"
  //       {...field}
  //       {...props}
  //       selected={field.value}
  //       onChange={val => form.setFieldValue(field.name, val)}
  //     />
  //   </div>
  // );

  // registerLocale('uk', uk);

  return (
    <>
      <FormField>
        <FieldName>Name</FieldName>
        <Input type="text" name="name" placeholder="name"></Input>
        <ErrorStyled component="div" name="name" />
      </FormField>

      <FormField>
        <FieldName>Quantity</FieldName>

        <Qty type="text" name="qty" placeholder="quantity"></Qty>
        <ErrorStyled component="div" name="qty" />

        <Unit as="select" name="unit">
          <option value="pcs">pcs</option>
          <option value="m">m</option>
          <option value="kg">kg</option>
        </Unit>
      </FormField>

      <FormField>
        <FieldName>Order</FieldName>
        <Field type="text" name="dateOrder">
          {() => (
            <div>
              <DatePickerStyled
                dateFormat="dd.MM.yyyy"
                selected={dateOrder}
                onChange={date => setDateOrder(date)}
                calendarStartDay={1}
                // locale="uk"
              />
            </div>
          )}
        </Field>
        <ErrorStyled component="div" name="dateOrder" />
      </FormField>

      <FormField>
        <FieldName>Supplier</FieldName>
        <Input type="text" name="supplier"></Input>
        <ErrorStyled component="div" name="supplier" />
      </FormField>

      <FormField>
        <FieldName>Invoice</FieldName>
        <Field type="text" name="dateInvoice">
          {() => (
            <div>
              <DatePickerStyled
                dateFormat="dd.MM.yyyy"
                selected={dateInvoice}
                onChange={date => setDateInvoice(date)}
                calendarStartDay={1}
                autoComplete="off"
                // locale="uk"
              />
            </div>
          )}
        </Field>
      </FormField>

      <FormField>
        <FieldName>Payment</FieldName>
        <Field type="text" name="datePayment">
          {() => (
            <div>
              <DatePickerStyled
                dateFormat="dd.MM.yyyy"
                selected={datePayment}
                onChange={date => setDatePayment(date)}
                calendarStartDay={1}
                // locale="uk"
              />
            </div>
          )}
        </Field>
      </FormField>

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

      <FormField>
        <FieldName>ETD</FieldName>
        <Field type="text" name="dateETD">
          {() => (
            <div>
              <DatePickerStyled
                dateFormat="dd.MM.yyyy"
                selected={dateETD}
                onChange={date => setDateETD(date)}
                calendarStartDay={1}
                // locale="uk"
              />
            </div>
          )}
        </Field>
        <ErrorStyled component="div" name="dateETD" />
      </FormField>

      <FormField>
        <FieldName>ETA</FieldName>
        <Field type="text" name="dateETA">
          {() => (
            <div>
              <DatePickerStyled
                dateFormat="dd.MM.yyyy"
                selected={dateETA}
                onChange={date => setDateETA(date)}
                calendarStartDay={1}
                // locale="uk"
              />
            </div>
          )}
        </Field>
        <ErrorStyled component="div" name="dateETA" />
      </FormField>

      <FormField>
        <FieldName>Comments</FieldName>
        <Comments as="textarea" rows="4" name="comments"></Comments>
        <ErrorStyled component="div" name="comments" />
      </FormField>
    </>
  );
};

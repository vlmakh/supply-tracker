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
import { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import uk from 'date-fns/locale/uk';
import { TaskContext } from 'utils/context';
import { useContext } from 'react';
import { t } from 'i18next';

export const FormCommon = ({ dates, setDates }) => {
  registerLocale('uk', uk);
  const { dateOrder, dateInvoice, datePayment, dateETD, dateETA } = dates;
  const { currentLang } = useContext(TaskContext);

  return (
    <>
      <FormField>
        <FieldName>{t('formTask.name')}</FieldName>
        <Input type="text" name="name" placeholder=""></Input>
        <ErrorStyled component="div" name="name" />
      </FormField>

      <FormField>
        <FieldName>{t('formTask.qty')}</FieldName>

        <Qty type="text" name="qty" placeholder=""></Qty>
        <ErrorStyled component="div" name="qty" />

        <Unit as="select" name="unit">
          <option value={t('formTask.pcs')}>{t('formTask.pcs')}</option>
          <option value={t('formTask.m')}>{t('formTask.m')}</option>
          <option value={t('formTask.kg')}>{t('formTask.kg')}</option>
        </Unit>
      </FormField>

      <FormField>
        <FieldName>{t('formTask.order')}</FieldName>
        <Field type="text" name="dateOrder">
          {() => (
            <div>
              <DatePickerStyled
                dateFormat="dd.MM.yyyy"
                selected={dateOrder}
                onChange={date =>
                  setDates(prevState => ({
                    ...prevState,
                    dateOrder: date,
                  }))
                }
                calendarStartDay={1}
                locale={currentLang}
              />
            </div>
          )}
        </Field>
        <ErrorStyled component="div" name="dateOrder" />
      </FormField>

      <FormField>
        <FieldName>{t('formTask.supplier')}</FieldName>
        <Input type="text" name="supplier" placeholder=""></Input>
        <ErrorStyled component="div" name="supplier" />
      </FormField>

      <FormField>
        <FieldName>{t('formTask.invoice')}</FieldName>
        <Field type="text" name="dateInvoice">
          {() => (
            <div>
              <DatePickerStyled
                dateFormat="dd.MM.yyyy"
                selected={dateInvoice}
                onChange={date =>
                  setDates(prevState => ({
                    ...prevState,
                    dateInvoice: date,
                  }))
                }
                calendarStartDay={1}
                autoComplete="off"
                locale={currentLang}
              />
            </div>
          )}
        </Field>
      </FormField>

      <FormField>
        <FieldName>{t('formTask.payment')}</FieldName>
        <Field type="text" name="datePayment">
          {() => (
            <div>
              <DatePickerStyled
                dateFormat="dd.MM.yyyy"
                selected={datePayment}
                onChange={date =>
                  setDates(prevState => ({
                    ...prevState,
                    datePayment: date,
                  }))
                }
                calendarStartDay={1}
                locale={currentLang}
              />
            </div>
          )}
        </Field>
      </FormField>

      <FormField>
        <FieldName>{t('formTask.freight')}</FieldName>

        <Input as="select" name="freight">
          <option value={t('formTask.nova')}>{t('formTask.nova')}</option>
          <option value={t('formTask.sat')}>{t('formTask.sat')}</option>
          <option value={t('formTask.delivery')}>
            {t('formTask.delivery')}
          </option>
          <option value="FCA">FCA</option>
          <option value="DAP">DAP</option>
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
                onChange={date =>
                  setDates(prevState => ({
                    ...prevState,
                    dateETD: date,
                  }))
                }
                calendarStartDay={1}
                locale={currentLang}
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
                onChange={date =>
                  setDates(prevState => ({
                    ...prevState,
                    dateETA: date,
                  }))
                }
                calendarStartDay={1}
                locale={currentLang}
              />
            </div>
          )}
        </Field>
        <ErrorStyled component="div" name="dateETA" />
      </FormField>

      <FormField>
        <FieldName>{t('formTask.comments')}</FieldName>
        <Comments
          as="textarea"
          rows="4"
          name="comments"
          placeholder=""
        ></Comments>
        <ErrorStyled component="div" name="comments" />
      </FormField>
    </>
  );
};

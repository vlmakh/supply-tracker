import { FC, useState, useEffect } from 'react';
import { FormStyled, FormTitle, AddTaskFormButton } from './FormTask.styled';
import { Formik } from 'formik';
import { CloseButton } from 'components/Base/Buttons.styled';
import { schema } from './yupSchema';
import { FormCommon } from './FormCommon';
import { IoClose } from 'react-icons/io5';
import { t } from 'i18next';
import { ITask, IDatesNum } from 'components/types';

type Props = {
  toggleModal: () => void;
  handleAddTask: (x: Partial<ITask>) => void;
};

export const FormTaskAdd: FC<Props> = ({ toggleModal, handleAddTask }) => {
  const today = Date.now();

  const timeOffset = new Date().getTimezoneOffset();

  const [dates, setDates] = useState<IDatesNum>({
    dateOrder: today - timeOffset * 60000,
    dateInvoice: today + 86_400_000 - timeOffset * 60000,
    datePayment: today + 2 * 86_400_000 - timeOffset * 60000,
    dateETD: today + 3 * 86_400_000 - timeOffset * 60000,
    dateETA: today + 4 * 86_400_000 - timeOffset * 60000,
  });

  const { dateOrder, dateInvoice, datePayment, dateETD, dateETA } = dates;

  useEffect(() => {
    window.addEventListener('keydown', handleEscape);

    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  });

  const handleSubmit = (newTask: Partial<ITask>) => {
    handleAddTask({
      ...newTask,
      dateOrder: new Date(dateOrder).toISOString(),
      dateInvoice: new Date(dateInvoice).toISOString(),
      datePayment: new Date(datePayment).toISOString(),
      dateETD: new Date(dateETD).toISOString(),
      dateETA: new Date(dateETA).toISOString(),
    });

    toggleModal();
  };

  const handleEscape = (event: { code: string }) => {
    if (event.code === 'Escape') {
      toggleModal();
    }
  };

  return (
    <Formik
      onSubmit={handleSubmit}
      initialValues={{
        name: '',
        qty: 1,
        unit: `${t('formTask.pcs')}`,
        dateOrder: dateOrder,
        supplier: '-',
        dateInvoice: dateInvoice,
        datePayment: datePayment,
        freight: `${t('formTask.nova')}`,
        dateETD: dateETD,
        dateETA: dateETA,
        comments: '-',
      }}
      validationSchema={schema}
    >
      <FormStyled>
        <CloseButton type="button" onClick={toggleModal}>
          <IoClose size="20" />
        </CloseButton>

        <FormTitle>{t('formTask.add')}</FormTitle>

        <FormCommon dates={dates} setDates={setDates} />

        <AddTaskFormButton type="submit">{t('buttons.add')}</AddTaskFormButton>
      </FormStyled>
    </Formik>
  );
};

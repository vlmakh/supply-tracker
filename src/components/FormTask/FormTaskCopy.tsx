import { FC, useState, useEffect } from 'react';
import { FormStyled, FormTitle, AddTaskFormButton } from './FormTask.styled';
import { Formik } from 'formik';
import { CloseButton } from 'components/Base/Buttons.styled';
import { schema } from './yupSchema';
import { FormCommon } from './FormCommon';
import { IoClose } from 'react-icons/io5';
import { t } from 'i18next';
import { useTaskStore } from 'utils/store';
import { ITask, IDatesNum } from 'components/types';

type Props = {
  toggleCopyWindow: () => void;
  task: ITask;
};

export const FormTaskCopy: FC<Props> = ({ toggleCopyWindow, task }) => {
  const today = Date.now();

  const [dates, setDates] = useState<IDatesNum>({
    dateOrder: today,
    dateInvoice: today + 86_400_000,
    datePayment: today + 2 * 86_400_000,
    dateETD: today + 3 * 86_400_000,
    dateETA: today + 4 * 86_400_000,
  });

  const timeOffset = new Date().getTimezoneOffset();

  const { dateOrder, dateInvoice, datePayment, dateETD, dateETA } = dates;

  const { addNewTask } = useTaskStore(state => state);

  useEffect(() => {
    window.addEventListener('keydown', handleEscape);

    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  });

  const handleSubmit = (newTask: Partial<ITask>) => {
    addNewTask({
      ...newTask,
      dateOrder: dateOrder - timeOffset * 60000,
      dateInvoice: dateInvoice - timeOffset * 60000,
      datePayment: datePayment - timeOffset * 60000,
      dateETD: dateETD - timeOffset * 60000,
      dateETA: dateETA - timeOffset * 60000,
    });

    toggleCopyWindow();
  };

  const handleEscape = (event: { code: string }) => {
    if (event.code === 'Escape') {
      toggleCopyWindow();
    }
  };

  return (
    <Formik
      onSubmit={handleSubmit}
      initialValues={{
        name: task.name,
        qty: task.qty,
        unit: task.unit,
        dateOrder: dateOrder.toString(),
        supplier: task.supplier,
        dateInvoice: dateInvoice.toString(),
        datePayment: datePayment.toString(),
        freight: task.freight,
        completed: false,
        dateETD: dateETD.toString(),
        dateETA: dateETA.toString(),
        comments: task.comments,
      }}
      validationSchema={schema}
    >
      <FormStyled>
        <CloseButton type="button" onClick={toggleCopyWindow}>
          <IoClose size="20" />
        </CloseButton>

        <FormTitle>{t('formTask.add')}</FormTitle>

        <FormCommon dates={dates} setDates={setDates} />

        <AddTaskFormButton type="submit">{t('buttons.add')}</AddTaskFormButton>
      </FormStyled>
    </Formik>
  );
};

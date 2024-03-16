import { FC, useState, useEffect } from 'react';
import { FormStyled, FormTitle, AddTaskFormButton } from './FormTask.styled';
import { Formik } from 'formik';
import { CloseButton } from 'components/Base/Buttons.styled';
import { FormCommon } from './FormCommon';
import { schema } from './yupSchema';
import { IoClose } from 'react-icons/io5';
import { t } from 'i18next';
import { useTaskStore } from 'utils/store';
import { ITask, IDatesNum } from 'components/types';
import { formatDateMS } from 'utils/formatDate';

type Props = {
  toggleEditWindow: () => void;
  task: ITask;
};

export const FormTaskEdit: FC<Props> = ({ toggleEditWindow, task }) => {
  const [dates, setDates] = useState<IDatesNum>({
    dateOrder: +formatDateMS(task.dateOrder.toString()),
    dateInvoice: +formatDateMS(task.dateInvoice.toString()),
    datePayment: +formatDateMS(task.datePayment.toString()),
    dateETD: +formatDateMS(task.dateETD.toString()),
    dateETA: +formatDateMS(task.dateETA.toString()),
  });

  const { dateOrder, dateInvoice, datePayment, dateETD, dateETA } = dates;

  const { handleUpdateTask } = useTaskStore(state => state);

  useEffect(() => {
    window.addEventListener('keydown', handleEscape);

    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  });

  const handleSubmit = (newTask: ITask) => {
    const data = {
      newTask,
      dateOrder: new Date(dateOrder).toISOString(),
      dateInvoice: new Date(dateInvoice).toISOString(),
      datePayment: new Date(datePayment).toISOString(),
      dateETD: new Date(dateETD).toISOString(),
      dateETA: new Date(dateETA).toISOString(),
    };

    task._id && handleUpdateTask(task._id, data);

    toggleEditWindow();
  };

  const handleEscape = (event: { code: string }) => {
    if (event.code === 'Escape') {
      toggleEditWindow();
    }
  };

  const initialValues: ITask = {
    _id: task._id,
    name: task.name,
    qty: task.qty,
    unit: task.unit,
    dateOrder: dateOrder,
    supplier: task.supplier,
    dateInvoice: dateInvoice,
    datePayment: datePayment,
    freight: task.freight,
    completed: task.completed,
    dateETD: dateETD,
    dateETA: dateETA,
    comments: task.comments,
  };

  return (
    <Formik
      onSubmit={handleSubmit}
      initialValues={initialValues}
      validationSchema={schema}
    >
      <FormStyled>
        <CloseButton type="button" onClick={toggleEditWindow}>
          <IoClose size="20" />
        </CloseButton>

        <FormTitle>{t('formTask.edit')}</FormTitle>

        <FormCommon dates={dates} setDates={setDates} />

        <AddTaskFormButton type="submit">{t('buttons.save')}</AddTaskFormButton>
      </FormStyled>
    </Formik>
  );
};

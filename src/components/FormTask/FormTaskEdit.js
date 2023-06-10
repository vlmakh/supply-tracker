import { FormStyled, FormTitle } from './FormTask.styled';
import { useEffect } from 'react';
import { Formik } from 'formik';
import { IoClose } from 'react-icons/io5';
import { CloseButton, AddTaskButton } from 'components/Base/Buttons.styled';
import { FormCommon } from './FormCommon';
import { updateTask } from 'utils/operations';

export const FormTaskEdit = ({ handleModal, handleEditTask, task, tasks }) => {
  useEffect(() => {
    window.addEventListener('keydown', handleEscape);

    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  });

  const handleSubmit = newTask => {
    updateTask(task._id, newTask)
      .then(data => {
        const idx = tasks.findIndex(task => task._id === data._id);
        tasks.splice(idx, 1, data);
        handleEditTask();
      })
      .catch(err => console.log(err.message));
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
        dateETD: task.dateETD || '-',
        dateETA: task.dateETA,
        comments: task.comments,
      }}
    >
      <FormStyled>
        <CloseButton type="button" onClick={handleModal}>
          <IoClose size="20" />
        </CloseButton>

        <FormTitle>Edit task</FormTitle>

        <FormCommon />

        <AddTaskButton type="submit">Save</AddTaskButton>
      </FormStyled>
    </Formik>
  );
};

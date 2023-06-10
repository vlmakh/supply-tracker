import { Task, Num, Name } from './TaskItem.styled';
import { useState } from 'react';
import { updateTaskStatus, updateTask, deleteTask } from 'utils/operations';
import { TDButton } from 'components/Base/Buttons.styled';
import { AiFillEdit, AiFillCopy, AiFillDelete } from 'react-icons/ai';
import Modal from 'components/Modal/Modal';
import { FormTaskEdit } from 'components/FormTask/FormTaskEdit';
// import { formatDateUTC } from 'utils/formatDate';

export const TaskItem = ({ task, idx, tasks }) => {
  const [status, setStatus] = useState(task.completed);
  const [showFormTaskEdit, setShowFormTaskEdit] = useState(false);

  const handleCompleteTask = (id, status) => {
    updateTaskStatus(id, status)
      .then(() => setStatus(!status))
      .catch(e => console.log(e.message));
  };

  const handleModal = () => {
    setShowFormTaskEdit(!showFormTaskEdit);
  };

  const handleCopy = () => {
    console.log('copy');
  };

  const handleEditTask = newTask => {
    updateTask(task._id, newTask)
      .then(data => {
        tasks.splice(idx, 1, data);
        setShowFormTaskEdit(!showFormTaskEdit);
      })

      .catch(err => console.log(err.message));
  };

  const handleDelete = id => {
    deleteTask(id)
      .then(() => tasks.filter(task => task._id !== id))
      .catch(err => console.log(err.message));
  };

  return (
    <>
      <Task completed={status}>
        <td>
          <input
            type="checkbox"
            checked={status}
            onChange={() => handleCompleteTask(task._id, status)}
          />
        </td>
        <Num>{idx + 1} </Num>
        <Name>{task.name} </Name>
        <td>{task.qty} </td>
        <td> pcs</td>
        <td>{task.dateOrder} </td>
        <td> {task.supplier}</td>
        <td>{task.dateInvoice} </td>
        <td> </td>
        <td>{task.datePayment} </td>
        <td>{task.freight}</td>
        <td> </td>
        <td> {task.dateETD}</td>
        <td> </td>
        <td> {task.dateETA}</td>
        <td> </td>
        <td> {task.comments} </td>
        <td>
          <TDButton type="button" onClick={handleModal} disabled={status}>
            <AiFillEdit />
          </TDButton>
        </td>
        <td>
          <TDButton type="button" onClick={handleCopy}>
            <AiFillCopy />
          </TDButton>
        </td>
        <td>
          <TDButton type="button" onClick={() => handleDelete(task._id)}>
            <AiFillDelete />
          </TDButton>
        </td>
      </Task>

      {showFormTaskEdit && (
        <Modal onClose={handleModal}>
          <FormTaskEdit
            handleModal={handleModal}
            handleEditTask={handleEditTask}
            task={task}
          />
        </Modal>
      )}
    </>
  );
};

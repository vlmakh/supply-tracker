import {
  Task,
  Num,
  Name,
  Data,
  DataETA,
  Info,
  Days,
  Freight,
} from './TaskItem.styled';
import { useState, useContext } from 'react';
import { updateTaskStatus, deleteTask } from 'utils/operations';
import { TDButton } from 'components/Base/Buttons.styled';
import { AiFillEdit, AiFillCopy, AiFillDelete } from 'react-icons/ai';
import Modal from 'components/Modal/Modal';
import { FormTaskEdit } from 'components/FormTask/FormTaskEdit';
import { FormTaskCopy } from 'components/FormTask/FormTaskCopy';
import { TaskContext } from 'utils/context';

export const TaskItem = ({ task, idx }) => {
  const [status, setStatus] = useState(task.completed);
  const [showFormTaskEdit, setShowFormTaskEdit] = useState(false);
  const [showFormTaskCopy, setShowFormTaskCopy] = useState(false);
  const { dispatch } = useContext(TaskContext);

  const handleCompleteTask = (id, status) => {
    updateTaskStatus(id, status)
      .then(data => {
        setStatus(!status);
        dispatch({ type: 'editTask', newTask: data, taskId: id });
      })

      .catch(e => console.log(e.message));
  };

  const handleCopyTask = () => {
    setShowFormTaskCopy(!showFormTaskCopy);
  };

  const handleEditTask = () => {
    setShowFormTaskEdit(!showFormTaskEdit);
  };

  const handleDelete = id => {
    deleteTask(id)
      .then(dispatch({ type: 'deleteTask', taskId: id }))
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
        <td>
          <TDButton type="button" onClick={handleEditTask} disabled={status}>
            <AiFillEdit />
          </TDButton>
        </td>
        <td>
          <TDButton type="button" onClick={handleCopyTask}>
            <AiFillCopy />
          </TDButton>
        </td>
        <Name>{task.name} </Name>
        <td>{task.qty} </td>
        <td> pcs</td>
        <Data today={task.dateOrder}>{task.dateOrder} </Data>
        <Info> {task.supplier}</Info>
        <Data today={task.dateInvoice}>{task.dateInvoice} </Data>
        <Days> </Days>
        <Data today={task.datePayment}>{task.datePayment} </Data>
        <Freight>{task.freight}</Freight>
        <Days> </Days>
        <Data today={task.dateETD}> {task.dateETD}</Data>
        <Days> </Days>
        <DataETA today={task.dateETA} completed={status}>
          {task.dateETA}
        </DataETA>
        <Days> </Days>
        <Info> {task.comments} </Info>

        <td>
          <TDButton type="button" onClick={() => handleDelete(task._id)}>
            <AiFillDelete />
          </TDButton>
        </td>
      </Task>

      {showFormTaskEdit && (
        <Modal onClose={handleEditTask}>
          <FormTaskEdit handleEditTask={handleEditTask} task={task} />
        </Modal>
      )}

      {showFormTaskCopy && (
        <Modal onClose={handleCopyTask}>
          <FormTaskCopy handleCopyTask={handleCopyTask} task={task} />
        </Modal>
      )}
    </>
  );
};

import {
  Task,
  Checkbox,
  CheckBtn,
  Num,
  Btn,
  Name,
  Qty,
  Data,
  Supplier,
  DataETA,
  Info,
  Freight,
} from './TaskItem.styled';
import { useState, useContext } from 'react';
import { updateTaskStatus, deleteTask } from 'utils/operations';
import { TDButton } from 'components/Base/Buttons.styled';
import { FaCheck, FaArrowAltCircleRight } from 'react-icons/fa';
import { MdContentCopy } from 'react-icons/md';
import { MdDeleteOutline } from 'react-icons/md';
import Modal from 'components/Modal/Modal';
import { FormTaskEdit } from 'components/FormTask/FormTaskEdit';
import { FormTaskCopy } from 'components/FormTask/FormTaskCopy';
import { TaskContext } from 'utils/context';
import { formatDateUTC } from 'utils/formatDate';

export const TaskItem = ({ task, idx }) => {
  const [status, setStatus] = useState(task.completed);
  const [showFormTaskEdit, setShowFormTaskEdit] = useState(false);
  const [showFormTaskCopy, setShowFormTaskCopy] = useState(false);
  const { dispatch } = useContext(TaskContext);

  const formatSupplier = name => {
    if (name.length > 18) {
      return name.slice(0, 17) + '...';
    } else return name;
  };

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
        <Num>{idx + 1} </Num>

        <Btn>
          <Checkbox type="checkbox" checked={status} readOnly />
          <CheckBtn
            type="button"
            onClick={() => handleCompleteTask(task._id, status)}
          >
            {status ? (
              <FaCheck size="18" />
            ) : (
              <FaArrowAltCircleRight size="18" />
            )}
          </CheckBtn>
        </Btn>

        <Btn>
          <TDButton type="button" onClick={handleCopyTask}>
            <MdContentCopy size="18" />
          </TDButton>
        </Btn>

        <Name>
          <TDButton type="button" onClick={handleEditTask} disabled={status}>
            {task.name}
          </TDButton>
        </Name>

        <Qty>{task.qty} </Qty>

        <td> pcs</td>

        <Data today={task.dateOrder}>{formatDateUTC(task.dateOrder)} </Data>

        <Supplier> {formatSupplier(task.supplier)}</Supplier>

        <Data today={task.dateInvoice}>{task.dateInvoice} </Data>

        <Data today={task.datePayment}>{task.datePayment} </Data>

        <Freight>{task.freight}</Freight>

        <Data today={task.dateETD}> {task.dateETD}</Data>

        <DataETA today={task.dateETA} completed={status}>
          {task.dateETA}
        </DataETA>

        <Info> {formatSupplier(task.comments)} </Info>

        <Btn>
          <TDButton type="button" onClick={() => handleDelete(task._id)}>
            <MdDeleteOutline size="18" />
          </TDButton>
        </Btn>
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

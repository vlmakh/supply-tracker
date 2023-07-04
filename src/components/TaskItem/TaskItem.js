import {
  Task,
  Checkbox,
  CheckBtn,
  Num,
  Exec,
  Name,
  Comment,
  Qty,
  Unit,
  Data,
  Supplier,
  Freight,
  Days,
  Delete,
  BtnCopy,
  BtnDel,
  BtnName,
} from './TaskItem.styled';
import { useState, useContext } from 'react';
import { updateTaskStatus, deleteTask } from 'utils/operations';
import { FaCheck, FaArrowAltCircleRight } from 'react-icons/fa';
import { MdContentCopy } from 'react-icons/md';
import { MdDeleteOutline } from 'react-icons/md';
import Modal from 'components/Modal/Modal';
import { FormTaskEdit } from 'components/FormTask/FormTaskEdit';
import { FormTaskCopy } from 'components/FormTask/FormTaskCopy';
import { TaskContext } from 'utils/context';
import {
  formatDate,
  formatDateCut,
  formatDateMS,
  formatDateDays,
} from 'utils/formatDate';
import { TaskLoader } from 'components/Loader/TaskLoader';

export const TaskItem = ({ task, idx }) => {
  const [status, setStatus] = useState(task.completed);
  const [showFormTaskEdit, setShowFormTaskEdit] = useState(false);
  const [showFormTaskCopy, setShowFormTaskCopy] = useState(false);
  const { dispatch } = useContext(TaskContext);
  const [isProcessing, setIsProcessing] = useState(false);

  const formatSupplier = name => {
    if (name && name.length > 21) {
      return name.slice(0, 20) + '...';
    } else return name;
  };

  const handleCompleteTask = (id, status) => {
    if (formatDateCut(task.dateETA) < formatDateCut(task.dateOrder)) {
      alert("ETA date can't be earlier than order date");
      return;
    }

    setIsProcessing(true);

    updateTaskStatus(id, status)
      .then(data => {
        setStatus(!status);
        dispatch({ type: 'editTask', newTask: data, taskId: id });
      })
      .catch(e => console.log(e.message))
      .finally(() => {
        setIsProcessing(false);
      });
  };

  const handleCopyTask = () => {
    setShowFormTaskCopy(!showFormTaskCopy);
  };

  const handleEditTask = () => {
    setShowFormTaskEdit(!showFormTaskEdit);
  };

  const handleDelete = id => {
    const result = window.confirm('Confirm task delete?');
    if (result) {
      deleteTask(id)
        .then(dispatch({ type: 'deleteTask', taskId: id }))
        .catch(err => console.log(err.message));
    }
  };

  return (
    <>
      <Task completed={status}>
        <Num>{idx + 1} </Num>

        <Exec>
          <Checkbox type="checkbox" checked={status} readOnly />
          <CheckBtn
            type="button"
            onClick={() => handleCompleteTask(task._id, status)}
          >
            {status && !isProcessing && <FaCheck size="18" />}

            {!status && !isProcessing && <FaArrowAltCircleRight size="18" />}

            <TaskLoader isProcessing={isProcessing} />
          </CheckBtn>
        </Exec>

        <Exec>
          <BtnCopy type="button" onClick={handleCopyTask}>
            <MdContentCopy size="18" />
          </BtnCopy>
        </Exec>

        <Name>
          <BtnName type="button" onClick={handleEditTask} disabled={status}>
            {task.name}
          </BtnName>

          <Comment>{task.comments}</Comment>
        </Name>

        <Qty>{task.qty}</Qty>

        <Unit>{task.unit}</Unit>

        <Data today={task.dateOrder} completed={status}>
          {formatDate(task.dateOrder)}
        </Data>

        <Supplier> {formatSupplier(task.supplier)}</Supplier>

        <Data today={task.dateInvoice} completed={status}>
          {formatDate(task.dateInvoice)}
        </Data>

        <Data today={task.datePayment} completed={status}>
          {formatDate(task.datePayment)}{' '}
        </Data>

        <Freight>{task.freight}</Freight>

        <Data today={task.dateETD} completed={status}>
          {formatDate(task.dateETD)}
        </Data>

        <Data today={task.dateETA} completed={status}>
          {formatDate(task.dateETA)}
        </Data>

        <Days>
          {formatDateDays(
            formatDateMS(task.dateETA) - formatDateMS(task.dateInvoice)
          )}
        </Days>

        <Delete>
          <BtnDel type="button" onClick={() => handleDelete(task._id)}>
            <MdDeleteOutline size="18" />
          </BtnDel>
        </Delete>
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

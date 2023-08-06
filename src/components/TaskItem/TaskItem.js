import { useState } from 'react';
import { updateTaskStatus } from 'utils/operations';
import {
  formatDate,
  formatDateCut,
  formatDateMS,
  formatDateDays,
} from 'utils/formatDate';
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
import Modal from 'components/Modal/Modal';
import { FormTaskEdit } from 'components/FormTask/FormTaskEdit';
import { FormTaskCopy } from 'components/FormTask/FormTaskCopy';
import { FaCheck, FaArrowAltCircleRight } from 'react-icons/fa';
import { MdContentCopy } from 'react-icons/md';
import { MdDeleteOutline } from 'react-icons/md';
import { TaskLoader } from 'components/Loader/TaskLoader';
import { FormChangeUser } from 'components/TaskItem/FormChangeUser';
import { useUserStore, useTaskStore } from 'utils/store';

export const TaskItem = ({ task, idx, userList }) => {
  const role = useUserStore(state => state.user.role);
  const [showFormTaskEdit, setShowFormTaskEdit] = useState(false);
  const [showFormTaskCopy, setShowFormTaskCopy] = useState(false);

  const { handleUpdateTaskOwner, handleUpdateTaskStatus, handleDeleteTask } =
    useTaskStore(state => state);
  const [isProcessing, setIsProsessing] = useState(false);

  const formatName = name => {
    if (name && name.length > 28) {
      return name.slice(0, 27) + '...';
    } else return name;
  };

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

    setIsProsessing(true);

    updateTaskStatus(id, status)
      .then(data => {
        handleUpdateTaskStatus(id, data);
      })
      .catch(e => console.log(e.message))
      .finally(() => {
        setIsProsessing(false);
      });
  };

  const handleChangeOwner = (taskId, newOwnerId, newUserId) => {
    handleUpdateTaskOwner(taskId, newOwnerId, newUserId);
  };

  const toggleCopyWindow = () => {
    setShowFormTaskCopy(!showFormTaskCopy);
  };

  const toggleEditWindow = () => {
    setShowFormTaskEdit(!showFormTaskEdit);
  };

  const onDelete = id => {
    const result = window.confirm('Confirm task delete?');
    if (result) {
      handleDeleteTask(id);
    }
  };

  return (
    <>
      <Task completed={task.completed}>
        <Num>{idx + 1} </Num>

        <Exec>
          <Checkbox
            name="readyTask"
            type="checkbox"
            checked={task.completed}
            readOnly
          />
          <CheckBtn
            type="button"
            onClick={() => handleCompleteTask(task._id, task.completed)}
          >
            {task.completed && !isProcessing && <FaCheck size="18" />}

            {!task.completed && !isProcessing && (
              <FaArrowAltCircleRight size="18" />
            )}

            <TaskLoader isProcessing={isProcessing} />
          </CheckBtn>
        </Exec>

        <Exec>
          <BtnCopy type="button" onClick={toggleCopyWindow}>
            <MdContentCopy size="18" />
          </BtnCopy>
        </Exec>

        <Name>
          <BtnName
            type="button"
            onClick={toggleEditWindow}
            disabled={task.completed}
          >
            {formatName(task.name)}
          </BtnName>

          <Comment>
            <b>{task.name}</b> <br /> {task.comments}
          </Comment>
        </Name>

        <Qty>{task.qty}</Qty>

        <Unit>{task.unit}</Unit>

        <Data today={task.dateOrder} completed={task.completed}>
          {formatDate(task.dateOrder)}
        </Data>

        <Supplier> {formatSupplier(task.supplier)}</Supplier>

        <Data today={task.dateInvoice} completed={task.completed}>
          {formatDate(task.dateInvoice)}
        </Data>

        <Data today={task.datePayment} completed={task.completed}>
          {formatDate(task.datePayment)}{' '}
        </Data>

        <Freight>{task.freight}</Freight>

        <Data today={task.dateETD} completed={task.completed}>
          {formatDate(task.dateETD)}
        </Data>

        <Data today={task.dateETA} completed={task.completed}>
          {formatDate(task.dateETA)}
        </Data>

        <Days>
          {formatDateDays(
            formatDateMS(task.dateETA) - formatDateMS(task.dateInvoice)
          )}
        </Days>

        <Delete>
          <BtnDel
            type="button"
            onClick={() => onDelete(task._id)}
            disabled={task.completed}
          >
            <MdDeleteOutline size="18" />
          </BtnDel>
        </Delete>

        {role === 'HEAD' && (
          <td>
            <FormChangeUser
              status={task.completed}
              taskOwner={task.ownerName}
              handleChangeOwner={handleChangeOwner}
              taskId={task._id}
              isProcessing={isProcessing}
              userList={userList}
            />
          </td>
        )}
      </Task>

      {showFormTaskEdit && (
        <Modal onClose={toggleEditWindow}>
          <FormTaskEdit toggleEditWindow={toggleEditWindow} task={task} />
        </Modal>
      )}

      {showFormTaskCopy && (
        <Modal onClose={toggleCopyWindow}>
          <FormTaskCopy toggleCopyWindow={toggleCopyWindow} task={task} />
        </Modal>
      )}
    </>
  );
};

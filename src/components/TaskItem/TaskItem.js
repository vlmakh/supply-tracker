import { Task, Num, Name } from './TaskItem.styled';
import { useState } from 'react';
import { updateTaskStatus } from 'utils/operations';
import { TDButton } from 'components/Base/Buttons.styled';
import { AiFillEdit } from 'react-icons/ai';
import { ModalWindow } from 'components/Modal/Modal.styled';
import { FormTaskEdit } from 'components/FormTask/FormTaskEdit';

export const TaskItem = ({ task, idx }) => {
  const [status, setStatus] = useState(task.completed);
  // const [showEditTaskModal, setShowEditTaskModal] = useState(false);

  const handleCompleteTask = (id, status) => {
    updateTaskStatus(id, status)
      .then(() => setStatus(!status))
      .catch(e => console.log(e.message));
  };

  const handleEditTask = id => {
    console.log(id);

    // setShowEditTaskModal(!showEditTaskModal);
  };

  // const formatCompany = name => {
  //   if (name.length > 20) {
  //     return name.slice(0, 20) + '...';
  //   } else return name;
  // };

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
          <TDButton type="button" onClick={() => handleEditTask(task._id)}>
            <AiFillEdit />
          </TDButton>
        </td>
      </Task>

      {/* {showEditTaskModal && (
        <ModalWindow>
          <FormTaskEdit
            // handleModal={handleModal}
            handleEditTask={handleEditTask}
            task={task}
          />
        </ModalWindow>
      )} */}
    </>
  );
};

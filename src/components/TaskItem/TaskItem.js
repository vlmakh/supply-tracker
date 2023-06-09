import { Task, Num, Name } from './TaskItem.styled';
import { useState } from 'react';
import { updateTaskStatus } from 'utils/operations';
import { TDButton } from 'components/Base/Buttons.styled';
import { AiFillEdit } from 'react-icons/ai';

export const TaskItem = ({ task, idx }) => {
  const [status, setStatus] = useState(task.completed);

  const handleCompleteTask = (id, status) => {
    updateTaskStatus(id, status)
      .then(() => setStatus(!status))
      .catch(e => console.log(e.message));
  };

  const handleEditTask = id => {
    console.log(id);
  };

  // const formatCompany = name => {
  //   if (name.length > 20) {
  //     return name.slice(0, 20) + '...';
  //   } else return name;
  // };

  return (
    <Task completed={status}>
      <td>
        <input
          type="checkbox"
          checked={status}
          onChange={() => handleCompleteTask(task._id, status)}
        />
        {/* <button
          type="button"
          onClick={() => handleCompleteTask(task._id, status)}
        >
          V
        </button> */}
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
      <td>Nova poshta</td>
      <td> </td>
      <td> {task.dateETD}</td>
      <td> </td>
      <td> {task.dateETA}</td>
      <td> {task.dateETA - task.dateOrder}</td>
      <td> </td>
      <td>
        <TDButton type="button" onClick={() => handleEditTask(task._id)}>
          <AiFillEdit />
        </TDButton>
      </td>
    </Task>
  );
};

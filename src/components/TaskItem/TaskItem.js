import { Task, Name } from './TaskItem.styled';
import { useState } from 'react';
import { updateTaskStatus } from 'utils/operations';

export const TaskItem = ({ task }) => {
  const [status, setStatus] = useState(task.completed);

  const handleCompleteTask = (id, status) => {
    updateTaskStatus(id, status)
      .then(() => setStatus(!status))
      .catch(e => console.log(e.message));
  };

  // const formatCompany = name => {
  //   if (name.length > 20) {
  //     return name.slice(0, 20) + '...';
  //   } else return name;
  // };

  return (
    <Task completed={status}>
      <td>
        <input type="checkbox" checked={status} readOnly />
        <button
          type="button"
          onClick={() => handleCompleteTask(task._id, status)}
        >
          V
        </button>
      </td>
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
      <td> {task.dateETA}</td>
      <td> </td>
      <td> {task.dateETD}</td>
      <td> </td>
      <td> </td>
    </Task>
  );
};

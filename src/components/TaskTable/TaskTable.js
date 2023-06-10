import { Table } from './TaskTable.styled';
import { TaskItem } from 'components/TaskItem/TaskItem';
// import { updateTask } from 'utils/operations';
// import { useState } from 'react';

export const TaskTable = ({ tasks }) => {
  // const [showFormTaskEdit, setShowFormTaskEdit] = useState(false);

  // const handleEditTask = id => {
  //   console.log(id);

  // updateTask(id).then(data => {
  //   const index = tasks.findIndex(
  //     contact => contact.id === action.payload.id
  //   );
  //   state.items.splice(index, 1, action.payload);
  // })
  // setShowFormTaskEdit(!showFormTaskEdit);
  // };

  return (
    <Table>
      <thead>
        <tr>
          <th></th>
          <th></th>
          <th>Name</th>
          <th>Qty</th>
          <th>Unit</th>
          <th>Order</th>
          <th>Supplier</th>
          <th>Invoice</th>
          <th></th>
          <th>Payment</th>
          <th>Freight</th>
          <th></th>
          <th>ETD</th>
          <th></th>
          <th>ETA</th>
          <th>Days</th>
          <th>Comments</th>
          <th></th>
          <th></th>
        </tr>
      </thead>

      <tbody>
        {tasks.map((task, idx) => {
          return <TaskItem key={idx} task={task} idx={idx} tasks={tasks} />;
        })}
      </tbody>
    </Table>
  );
};

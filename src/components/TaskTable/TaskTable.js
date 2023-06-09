import { Table } from './TaskTable.styled';
import { TaskItem } from 'components/TaskItem/TaskItem';

export const TaskTable = ({ tasks }) => {
  // const completeTask = id => {
  //   console.log('Task status was changed');
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
        </tr>
      </thead>

      <tbody>
        {tasks.map((task, idx) => {
          return <TaskItem key={task._id} task={task} idx={idx} />;
        })}
      </tbody>
    </Table>
  );
};

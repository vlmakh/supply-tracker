import { Table, THTablet, THDesktop } from './TaskTable.styled';
import { TaskItem } from 'components/TaskItem/TaskItem';
import { useContext } from 'react';
import { TaskContext } from 'utils/context';

export const TaskTable = () => {
  const { tasks } = useContext(TaskContext);

  return (
    <Table>
      <thead>
        <tr>
          <th></th>
          <th></th>
          <th></th>
          <th>Name</th>
          <th>Qty</th>
          <th>Unit</th>
          <THDesktop>Order</THDesktop>
          <THTablet>Supplier</THTablet>
          <THDesktop>Invoice</THDesktop>
          <THDesktop>Payment</THDesktop>
          <THTablet>Freight</THTablet>
          <THDesktop>ETD</THDesktop>
          <THDesktop>ETA</THDesktop>
          <THDesktop>Comments</THDesktop>
          <THDesktop></THDesktop>
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

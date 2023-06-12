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
          <THDesktop>Freight</THDesktop>
          <THDesktop>ETD</THDesktop>
          <THTablet>ETA</THTablet>
          <THDesktop>Days</THDesktop>
          <THDesktop>Comments</THDesktop>
        </tr>
      </thead>

      <tbody>
        {tasks.map((task, idx) => {
          return <TaskItem key={idx} task={task} idx={idx} />;
        })}
      </tbody>
    </Table>
  );
};

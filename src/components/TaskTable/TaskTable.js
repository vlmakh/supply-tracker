import { useState, useEffect } from 'react';
import { getAllUsers } from 'utils/operations';
import { Table, THTablet, THDesktop } from './TaskTable.styled';
import { TaskItem } from 'components/TaskItem/TaskItem';
import { t } from 'i18next';
import { useUserStore, useTaskStore } from 'utils/store';

export const TaskTable = () => {
  const tasks = useTaskStore(state => state.tasks);
  const role = useUserStore(state => state.user.role);
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    if (role === 'HEAD' || role === 'ADMIN')
      getAllUsers().then(data => setUserList([...data]));
  }, [role]);

  return (
    <Table>
      <thead>
        <tr>
          <th></th>
          <th></th>
          <th></th>
          <th>{t('taskTable.name')}</th>
          <th>{t('taskTable.qty')}</th>
          <th>{t('taskTable.unit')}</th>
          <THDesktop>{t('taskTable.order')}</THDesktop>
          <THTablet>{t('taskTable.supplier')}</THTablet>
          <THDesktop>{t('taskTable.invoice')}</THDesktop>
          <THDesktop>{t('taskTable.payment')}</THDesktop>
          <THTablet>{t('taskTable.freight')}</THTablet>
          <THDesktop>ETD</THDesktop>
          <THDesktop>ETA</THDesktop>
          <th></th>
          <THDesktop></THDesktop>
        </tr>
      </thead>

      <tbody>
        {tasks.map((task, idx) => {
          return (
            <TaskItem
              key={task._id}
              task={task}
              idx={idx}
              userList={userList}
            />
          );
        })}
      </tbody>
    </Table>
  );
};

import { Formik, Form } from 'formik';
import { Label, BtnCopy, Select } from './TaskItem.styled';
import { MdRestartAlt } from 'react-icons/md';
import { findUserId } from 'utils/findUser';
import { IUser } from 'components/types';
import { FC } from 'react';

type Props = {
  taskOwner: string,
  onChangeOwner: (x: string, y: string, z: string) => void,
  taskId: string,
  isProcessing: boolean,
  status: boolean,
  userList: Array<IUser>,
}

export const FormChangeUser: FC<Props> = ({
  taskOwner,
  onChangeOwner,
  taskId,
  isProcessing,
  status,
  userList,
}) => {
  const handleSubmit = (values: {userName: string}) => {
    const userId = findUserId(values.userName, userList);

    taskId && userId && onChangeOwner(taskId, values.userName, userId);
  };

  return (
    <Formik
      onSubmit={handleSubmit}
      initialValues={{
        userName: taskOwner,
      }}
    >
      <Form>
        <Label>
          <Select
            name="userName"
            as="select"
            autoComplete="off"
            disabled={status}
          >
            {userList &&
              userList.map((user: IUser, idx: number) => {
                return (
                  <option key={idx} value={user.name}>
                    {user.name}
                  </option>
                );
              })}
          </Select>

          <BtnCopy type="submit" disabled={isProcessing || status}>
            <MdRestartAlt size="20" />
          </BtnCopy>
        </Label>
      </Form>
    </Formik>
  );
};

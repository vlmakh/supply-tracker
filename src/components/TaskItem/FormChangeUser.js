import { Formik, Form } from 'formik';
import { Label, BtnCopy, Select } from '../TaskItem/TaskItem.styled';
import { MdRestartAlt } from 'react-icons/md';
import { findUserId } from 'utils/findUser';

export const FormChangeUser = ({
  taskOwner,
  handleChangeOwner,
  taskId,
  isProcessing,
  status,
  userList,
}) => {
  const handleSubmit = values => {
    const id = findUserId(values.userName, userList);

    handleChangeOwner(taskId, id);
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
            {userList.map(user => {
              return (
                <option key={user.id} value={user.name}>
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

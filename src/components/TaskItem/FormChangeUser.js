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
    const userId = findUserId(values.userName, userList);

    handleChangeOwner(taskId, values.userName, userId);
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
            {userList.map((user, idx) => {
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

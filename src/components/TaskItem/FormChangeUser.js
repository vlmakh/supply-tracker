import { Formik, Form } from 'formik';
import { Label, BtnCopy, Select } from '../TaskItem/TaskItem.styled';
import { MdRestartAlt } from 'react-icons/md';
import { userList } from 'utils/userList';
import { findUserId } from 'utils/findUser';

export const FormChangeUser = ({
  taskOwner,
  handleChangeOwner,
  taskId,
  isProcessing,
}) => {
  // const [isUserUpdating, setIsUserUpdating] = useState(false);

  const handleSubmit = values => {
    const id = findUserId(values.userName);

    handleChangeOwner(taskId, id);

    console.log(taskId, id);
    // setIsUserUpdating(false);
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
          <Select name="userName" as="select" autoComplete="off">
            {userList.map(user => {
              return (
                <option key={user.id} value={user.name}>
                  {user.name}
                </option>
              );
            })}
          </Select>

          <BtnCopy type="submit" disabled={isProcessing}>
            <MdRestartAlt size="20" />
          </BtnCopy>
        </Label>
      </Form>
    </Formik>
  );
};

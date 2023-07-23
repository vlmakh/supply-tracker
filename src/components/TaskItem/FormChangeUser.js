import { useState } from 'react';
import { Formik, Form } from 'formik';
import { Label, BtnCopy, Select } from '../TaskItem/TaskItem.styled';
import { MdRestartAlt } from 'react-icons/md';
import { userList } from 'utils/userList';

export const FormChangeUser = ({ taskOwner }) => {
  const [isUserUpdating, setIsUserUpdating] = useState(false);

  const handleUpdateUser = values => {
    setIsUserUpdating(true);

    console.log(values);
    setIsUserUpdating(false);
  };

  return (
    <Formik
      onSubmit={handleUpdateUser}
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

          <BtnCopy type="submit" disabled={isUserUpdating}>
            <MdRestartAlt size="20" />
          </BtnCopy>
        </Label>
      </Form>
    </Formik>
  );
};

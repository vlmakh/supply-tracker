import { FormMenu, MenuField, Label } from './TaskMenu.styled';
import { Box } from 'components/Base/Box';
// import { useState, useContext } from 'react';
// import { TaskContext } from 'utils/context';
import { Formik } from 'formik';
import { MdOutlinePlaylistRemove } from 'react-icons/md';
import { AiOutlineFile, AiOutlineFileText } from 'react-icons/ai';
import { BsBoxArrowRight, BsBoxArrowInRight } from 'react-icons/bs';
import { FaAmazonPay } from 'react-icons/fa';

export const TaskMenu = ({ showAllTasksInCurrentMonth, firstOfMonth }) => {
  //   const [showUncomplete(ted, setShowUncompleted] = useState(false);
  //   const { dispatch } = useContext(TaskContext);
  //   const today = new Date();

  //   const showUncompletedTasks = () => {
  //     if (showUncompleted === false) {
  //       setShowUncompleted(true);

  //       dispatch({ type: 'uncompletedTasks' });
  //     } else {
  //       setShowUncompleted(false);

  //       showAllTasksInCurrentMonth(firstOfMonth, today);
  //     }
  //   };

  // const handleChange = () => {
  //   console.log('values');
  // };

  return (
    <Formik
      initialValues={{
        picked: '',
      }}
    >
      <FormMenu>
        <Box role="group" display="flex">
          <Label>
            <MenuField type="radio" name="picked" value="Zero" />
            <MdOutlinePlaylistRemove size="24" />
          </Label>

          {/* <MenuField type="radio" name="picked" value="One" />
        <Label htmlFor="picked">
          <MdRemoveDone size="24" />
        </Label> */}

          <Label>
            <MenuField type="radio" name="picked" value="Two" />
            <AiOutlineFile size="24" />
          </Label>

          <Label>
            <MenuField type="radio" name="picked" value="Three" />
            <AiOutlineFileText size="24" />
          </Label>

          <Label>
            <MenuField type="radio" name="picked" value="Four" />
            <FaAmazonPay size="24" />
          </Label>

          <Label>
            <MenuField type="radio" name="picked" value="Five" />
            <BsBoxArrowRight size="24" />
          </Label>

          <Label>
            <MenuField type="radio" name="picked" value="Six" />
            <BsBoxArrowInRight size="24" />
          </Label>
        </Box>
      </FormMenu>
    </Formik>
  );
};

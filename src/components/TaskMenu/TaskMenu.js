import { FormMenu, MenuField, Label } from './TaskMenu.styled';
import { Box } from 'components/Base/Box';
import { useContext } from 'react';
import { TaskContext } from 'utils/context';
import { Formik } from 'formik';
import { MdOutlinePlaylistRemove, MdRemoveDone } from 'react-icons/md';
import { AiOutlineFile, AiOutlineFileText } from 'react-icons/ai';
import { BsBoxArrowRight, BsBoxArrowInRight } from 'react-icons/bs';
import { FaAmazonPay } from 'react-icons/fa';

export const TaskMenu = ({ hadleGetTasksByRange, startDate }) => {
  const { dispatch } = useContext(TaskContext);
  const today = new Date();

  const handleClick = value => {
    switch (value) {
      case 'uncompletedTasks':
        dispatch({ type: 'uncompletedTasks' });
        break;
      case 'dateOrderTasks':
        console.log('dateOrderTasks');
        // dispatch({ type: 'dateOrderTasks' });
        break;
      case 'dateInvoiceTasks':
        console.log('dateInvoiceTasks');
        // dispatch({ type: 'dateInvoiceTasks' });
        break;
      case 'datePaymentTasks':
        console.log('datePaymentTasks');
        // dispatch({ type: 'datePaymentTasks' });
        break;
      case 'dateETDTasks':
        console.log('dateETDTasks');
        // dispatch({ type: 'dateETDTasks' });
        break;
      case 'dateETATasks':
        console.log('dateETATasks');
        // dispatch({ type: 'dateETATasks' });
        break;
      default:
        hadleGetTasksByRange(startDate, today);
    }
  };

  return (
    <Formik
      initialValues={{
        picked: '',
      }}
    >
      <FormMenu>
        <Box role="group" display="flex">
          <Label>
            <MenuField
              type="radio"
              name="picked"
              value="all"
              onClick={() => handleClick('allTasks')}
            />
            <MdOutlinePlaylistRemove size="24" />
          </Label>

          <Label>
            <MenuField
              type="radio"
              name="picked"
              value="uncompletedTasks"
              onClick={() => handleClick('uncompletedTasks')}
            />
            <MdRemoveDone size="24" />
          </Label>

          <Label>
            <MenuField
              type="radio"
              name="picked"
              value="dateOrderTasks"
              onClick={() => handleClick('dateOrderTasks')}
            />
            <AiOutlineFile size="24" />
          </Label>

          <Label>
            <MenuField
              type="radio"
              name="picked"
              value="dateInvoiceTasks"
              onClick={() => handleClick('dateInvoiceTasks')}
            />
            <AiOutlineFileText size="24" />
          </Label>

          <Label>
            <MenuField
              type="radio"
              name="picked"
              value="datePaymentTasks"
              onClick={() => handleClick('datePaymentTasks')}
            />
            <FaAmazonPay size="24" />
          </Label>

          <Label>
            <MenuField
              type="radio"
              name="picked"
              value="dateETDTasks"
              onClick={() => handleClick('dateETDTasks')}
            />
            <BsBoxArrowRight size="24" />
          </Label>

          <Label>
            <MenuField
              type="radio"
              name="picked"
              value="dateETATasks"
              onClick={() => handleClick('dateETATasks')}
            />
            <BsBoxArrowInRight size="24" />
          </Label>
        </Box>
      </FormMenu>
    </Formik>
  );
};

import { useContext } from 'react';
import {
  getUncompletedTasksByRange,
  getTasksByDateOrder,
  getTasksByDateInvoice,
  getTasksByDatePayment,
  getTasksByDateETD,
  getTasksByDateETA,
} from 'utils/operations';
import { TaskContext } from 'utils/context';
import { FormMenu, MenuField, Label } from './TaskMenu.styled';
import { Formik } from 'formik';
import { Box } from 'components/Base/Box';
import { MdOutlinePlaylistRemove, MdRemoveDone } from 'react-icons/md';
import { AiOutlineFileAdd, AiOutlineFileText } from 'react-icons/ai';
import { BsBoxArrowRight, BsBoxArrowInRight } from 'react-icons/bs';
import { FaAmazonPay } from 'react-icons/fa';

export const TaskMenu = ({ hadleGetTasksByRange, startDate }) => {
  const { dispatch, setIsLoading } = useContext(TaskContext);
  const today = new Date();

  const hadleGetUncompletedTasksByRange = (start, end) => {
    setIsLoading(true);

    getUncompletedTasksByRange(start, end)
      .then(tasks => {
        dispatch({ type: 'getTasks', tasks });
      })
      .catch(error => console.log(error))
      .finally(() => {
        setIsLoading(false);
      });
  };

  const hadleGetTasksByDateOrder = start => {
    setIsLoading(true);

    getTasksByDateOrder(start)
      .then(tasks => {
        dispatch({ type: 'getTasks', tasks });
      })
      .catch(error => console.log(error))
      .finally(() => {
        setIsLoading(false);
      });
  };

  const hadleGetTasksByDateInvoice = start => {
    setIsLoading(true);

    getTasksByDateInvoice(start)
      .then(tasks => {
        dispatch({ type: 'getTasks', tasks });
      })
      .catch(error => console.log(error))
      .finally(() => {
        setIsLoading(false);
      });
  };

  const hadleGetTasksByDatePayment = start => {
    setIsLoading(true);

    getTasksByDatePayment(start)
      .then(tasks => {
        dispatch({ type: 'getTasks', tasks });
      })
      .catch(error => console.log(error))
      .finally(() => {
        setIsLoading(false);
      });
  };

  const hadleGetTasksByDateETD = start => {
    setIsLoading(true);

    getTasksByDateETD(start)
      .then(tasks => {
        dispatch({ type: 'getTasks', tasks });
      })
      .catch(error => console.log(error))
      .finally(() => {
        setIsLoading(false);
      });
  };

  const hadleGetTasksByDateETA = start => {
    setIsLoading(true);

    getTasksByDateETA(start)
      .then(tasks => {
        dispatch({ type: 'getTasks', tasks });
      })
      .catch(error => console.log(error))
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleClick = value => {
    switch (value) {
      case 'allTasks':
        hadleGetTasksByRange(startDate, today);
        break;
      case 'uncompletedTasks':
        hadleGetUncompletedTasksByRange(startDate, today);
        break;
      case 'dateOrderTasks':
        hadleGetTasksByDateOrder(today);
        break;
      case 'dateInvoiceTasks':
        hadleGetTasksByDateInvoice(today);
        break;
      case 'datePaymentTasks':
        hadleGetTasksByDatePayment(today);
        break;
      case 'dateETDTasks':
        hadleGetTasksByDateETD(today);
        break;
      case 'dateETATasks':
        hadleGetTasksByDateETA(today);
        break;
      default:
        return;
    }
  };

  return (
    <Formik
      initialValues={{
        picked: 'allTasks',
      }}
    >
      <FormMenu>
        <Box role="group" display="flex">
          <Label>
            <MenuField
              type="radio"
              name="picked"
              value="allTasks"
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
            <AiOutlineFileAdd size="24" />
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

import { StyledLinkBtn } from './TaskMenu.styled';
import { Box } from 'components/Base/Box';
// import { MdOutlinePlaylistRemove, MdRemoveDone } from 'react-icons/md';
import { AiOutlineFileAdd, AiOutlineFileText } from 'react-icons/ai';
import { BsBoxArrowRight, BsBoxArrowInRight } from 'react-icons/bs';
import { FaAmazonPay } from 'react-icons/fa';

export const TaskMenuToday = () => {
  return (
    <Box display="flex">
      {/* <StyledLinkBtn to="tasks/range">
        <MdOutlinePlaylistRemove size="24" />
      </StyledLinkBtn>

      <StyledLinkBtn to="tasks/uncompleted">
        <MdRemoveDone size="24" />
      </StyledLinkBtn> */}

      <StyledLinkBtn to="tasks/today-order">
        <AiOutlineFileAdd size="24" />
      </StyledLinkBtn>

      <StyledLinkBtn to="tasks/today-invoice">
        <AiOutlineFileText size="24" />
      </StyledLinkBtn>

      <StyledLinkBtn to="tasks/today-payment">
        <FaAmazonPay size="24" />
      </StyledLinkBtn>

      <StyledLinkBtn to="tasks/today-etd">
        <BsBoxArrowRight size="24" />
      </StyledLinkBtn>

      <StyledLinkBtn to="tasks/today-eta">
        <BsBoxArrowInRight size="24" />
      </StyledLinkBtn>
    </Box>
  );
};

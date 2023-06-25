import styled from '@emotion/styled';
import { formatDate, formatDateMS } from 'utils/formatDate';
import { TDButton } from 'components/Base/Buttons.styled';
const today = new Date();
const formattedToday = formatDate(new Date());

export const Task = styled.tr`
  color: ${p => (p.completed ? 'lightgrey' : '#212121')};
`;

export const Checkbox = styled.input`
  display: none;

  :checked + button {
    color: lightgrey;
  }
`;

export const CheckBtn = styled.button`
  cursor: pointer;
  border: none;
  background-color: transparent;
  width: 24px;
  padding: 0;
  color: green;
`;

export const Num = styled.td`
  text-align: right;
`;

export const Exec = styled.td`
  width: 24px;
`;

export const Name = styled.td`
  position: relative;
  min-width: 200px;
  text-align: left;
`;

export const Comment = styled.div`
  position: absolute;
  top: 32px;
  left: 0;

  background-color: white;
  box-shadow: ${p => p.theme.shadows.box};
  min-width: 240px;
  min-height: 48px;
  padding: 8px 4px;

  opacity: 0;
  visibility: hidden;
  z-index: 999;

  transition: opacity 250ms ease-in;
`;

export const Qty = styled.td`
  text-align: right;
`;

export const Unit = styled.td`
  width: 24px;
`;

export const Supplier = styled.td`
  min-width: 160px;

  @media screen and (max-width: 767.98px) {
    display: none;
  }
`;

export const Freight = styled.td`
  width: 100px;
  text-align: center;

  @media screen and (max-width: 767.98px) {
    display: none;
  }
`;

export const Data = styled.td`
  width: 72px;
  font-weight: 700;
  color: ${
    p => {
      if (
        formatDateMS(p.today) < today &&
        formatDate(p.today) !== formattedToday
      ) {
        return 'lightgrey';
      }
      if (!p.completed && formatDate(p.today) === formattedToday) {
        return 'blue';
      }
    }

    // !p.completed && formatDate(p.today) === formattedToday && 'blue'
  };

  @media screen and (max-width: 1199.98px) {
    display: none;
  }
`;

export const Days = styled.td`
  width: 24px;
  text-align: right;
`;

export const BtnCopy = styled(TDButton)`
  &:hover {
    color: green;
  }
`;

export const BtnDel = styled(TDButton)`
  &:hover {
    color: red;
  }
`;

export const BtnName = styled(TDButton)`
  padding: 1px 2px;

  &:hover {
    background-color: ${p => !p.disabled && '#a4faa4'};
  }

  &:hover + div {
    opacity: 1;
    visibility: visible;
  }
`;

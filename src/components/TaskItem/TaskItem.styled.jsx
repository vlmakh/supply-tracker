import styled from '@emotion/styled';
import { formatDate } from 'utils/formatDate';
const today = formatDate(new Date());

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

export const Btn = styled.td`
  width: 24px;
`;

export const Name = styled.td`
  position: relative;
  min-width: 200px;
  text-align: left;

  &:hover > div {
    opacity: 1;
    visibility: visible;
  }
`;

export const Comment = styled.div`
  position: absolute;
  top: 24px;
  left: 100px;

  background-color: white;
  box-shadow: ${p => p.theme.shadows.box};
  min-width: 240px;
  min-height: 48px;

  opacity: 0;
  visibility: hidden;
  z-index: 99;

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
  color: ${p => !p.completed && formatDate(p.today) === today && 'blue'};

  @media screen and (max-width: 1199.98px) {
    display: none;
  }
`;

export const Days = styled.td`
  text-align: center;

  @media screen and (max-width: 1199.98px) {
    display: none;
  }
`;

export const BtnDel = styled.td`
  width: 24px;

  @media screen and (max-width: 1199.98px) {
    display: none;
  }
`;

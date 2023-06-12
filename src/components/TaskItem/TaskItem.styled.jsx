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
  min-width: 240px;
  text-align: left;
`;

export const Qty = styled.td`
  text-align: right;
`;

export const Supplier = styled.td`
  width: 100px;

  @media screen and (max-width: 767.98px) {
    display: none;
  }
`;

export const Freight = styled.td`
  width: 100px;
  text-align: center;

  @media screen and (max-width: 1199.98px) {
    display: none;
  }
`;

export const Data = styled.td`
  font-weight: 700;
  color: ${p => p.today === today && 'blue'};

  @media screen and (max-width: 1199.98px) {
    display: none;
  }
`;

export const DataETA = styled.td`
  font-weight: 700;
  color: ${p => !p.completed && p.today === today && 'blue'};

  @media screen and (max-width: 767.98px) {
    display: none;
  }
`;

export const Info = styled.td`
  width: 100px;

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

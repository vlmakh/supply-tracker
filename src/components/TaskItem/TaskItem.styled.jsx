import styled from '@emotion/styled';
import { formatDate } from 'utils/formatDate';
const today = formatDate(new Date());

export const Task = styled.tr`
  color: ${p => (p.completed ? 'lightgrey' : '#212121')};
`;

export const Num = styled.td`
  text-align: right;
`;

export const Name = styled.td`
  width: 240px;
  text-align: left;
`;

export const Company = styled.p``;

export const Data = styled.td`
  font-weight: 700;
  color: ${p => p.today === today && 'blue'};
`;

export const DataETA = styled.td`
  font-weight: 700;
  color: ${p => !p.completed && p.today === today && 'blue'};
`;

export const Transport = styled.p`
  width: 100px;
  text-align: center;
`;

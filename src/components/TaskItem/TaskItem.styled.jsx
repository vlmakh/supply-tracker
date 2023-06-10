import styled from '@emotion/styled';

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

export const Date = styled.p`
  font-weight: 700;
`;

export const Transport = styled.p`
  width: 100px;
  text-align: center;
`;

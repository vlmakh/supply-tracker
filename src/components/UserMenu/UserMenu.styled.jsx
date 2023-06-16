import styled from '@emotion/styled';
import { NavLink } from 'react-router-dom';

export const Menu = styled.div`
  position: absolute;
  top: 32px;
  right: 0;

  width: 240px;
  padding: 16px;
  background-color: white;

  box-shadow: ${p => p.theme.shadows.box};
`;

export const UserName = styled.span`
  text-decoration: none;
  color: #212121;
  font-weight: 700;

  @media screen and (max-width: 767.98px) {
    display: none;
  }
`;

export const Logout = styled(NavLink)`
  font-weight: 700;
  display: flex;
  gap: 8px;
  align-items: center;
`;

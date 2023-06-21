import styled from '@emotion/styled';
import { NavLink } from 'react-router-dom';

export const Menu = styled.div`
  position: absolute;
  top: 32px;
  right: 0;

  width: 240px;
  padding: 16px;
  background-color: white;
  border-radius: 8px;

  box-shadow: ${p => p.theme.shadows.box};

  opacity: 0;
  visibility: hidden;
  z-index: 99;
  transition: opacity 250ms ease-in, transform 250ms ease-in;
  transform: translateY(24px);
`;

export const UserEmail = styled.p`
  color: #212121;
  font-weight: 700;
`;

export const Logout = styled(NavLink)`
  text-decoration: none;
  color: #212121;
  margin-top: 16px;
  font-weight: 700;
  display: flex;
  gap: 8px;
  align-items: center;
  transition: color 250ms ease-in;

  &:hover {
    color: green;
  } 
`;

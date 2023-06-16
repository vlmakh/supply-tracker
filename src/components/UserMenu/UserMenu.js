import { Menu, Logout } from './UserMenu.styled';
import { IoMdLogOut } from 'react-icons/io';

export const UserMenu = ({ handleLogout }) => {
  return (
    <Menu>
      <Logout to="/" onClick={handleLogout}>
        <span>Logout</span> <IoMdLogOut size="18" />
      </Logout>
    </Menu>
  );
};

import { Menu, Logout, UserName } from './UserMenu.styled';
import { IoMdLogOut } from 'react-icons/io';

export const UserMenu = ({ handleLogout, user }) => {
  return (
    <Menu>
      <UserName>{user}</UserName>
      <Logout to="/" onClick={handleLogout}>
        <span>Logout</span> <IoMdLogOut size="18" />
      </Logout>
    </Menu>
  );
};

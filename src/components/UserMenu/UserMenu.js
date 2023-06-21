import { Menu, Logout, UserEmail } from './UserMenu.styled';
import { IoMdLogOut } from 'react-icons/io';
import { FaUserCircle } from 'react-icons/fa';

export const UserMenu = ({ handleLogout, user, email }) => {
  return (
    <Menu>
      <UserEmail>
        <FaUserCircle size="24" />
        {email}
      </UserEmail>

      <Logout to="/account">{user}</Logout>

      <Logout to="/" onClick={handleLogout}>
        <span>Logout</span> <IoMdLogOut size="24" />
      </Logout>
    </Menu>
  );
};

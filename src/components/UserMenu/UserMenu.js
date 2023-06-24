import { Menu, Logout, UserEmail } from './UserMenu.styled';
import { IoMdLogOut } from 'react-icons/io';
import { FaUserCircle } from 'react-icons/fa';
import { MdOutlineManageAccounts } from 'react-icons/md';

export const UserMenu = ({ handleLogout, name, email }) => {
  return (
    <Menu>
      <UserEmail>
        <FaUserCircle size="24" />
        {email}
      </UserEmail>

      <Logout to="/account">
        <MdOutlineManageAccounts size="24" />
        {name}
      </Logout>

      <Logout to="/" onClick={handleLogout}>
        <IoMdLogOut size="24" />
        <span>Logout</span>
      </Logout>
    </Menu>
  );
};

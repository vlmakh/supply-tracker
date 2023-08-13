import { useLocation } from "react-router";
import { Menu, Logout, UserEmail } from "./UserMenu.styled";
import { IoMdLogOut } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { MdOutlineManageAccounts } from "react-icons/md";
import { t } from "i18next";
import { FC } from "react";

type Props = {
  handleLogout: () => void;
  name: string;
  email: string;
};

export const UserMenu: FC<Props> = ({ handleLogout, name, email }) => {
  const location = useLocation();

  return (
    <Menu>
      <UserEmail>
        <FaUserCircle size="24" />
        {email}
      </UserEmail>

      <Logout to="/account" state={{ from: location }}>
        <MdOutlineManageAccounts size="24" />
        {name}
      </Logout>

      <Logout to="/" onClick={handleLogout}>
        <IoMdLogOut size="24" />
        <span>{t("userMenu.logout")}</span>
      </Logout>
    </Menu>
  );
};

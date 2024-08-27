import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useUser } from "../../state-management/contexts/userContext";
import { useNavigate } from "react-router-dom";

const AccountButton = () => {
  const { username, setUserID, setUsername, setEmail } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear local storage
    localStorage.removeItem("token");
    localStorage.removeItem("userID");

    // Reset context values
    setUserID(0); // Assuming 0 is an initial value indicating no user
    setUsername("");
    setEmail("");

    // Redirect to login or home page
    navigate("/"); // Adjust the route as needed
  };

  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
        Welcome {username}!
      </MenuButton>
      <MenuList>
        <MenuItem onClick={handleLogout}>Log Out</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default AccountButton;

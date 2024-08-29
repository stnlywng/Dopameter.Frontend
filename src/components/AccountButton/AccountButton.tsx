import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

const AccountButton = () => {
  const username = localStorage.getItem("username");
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear local storage
    localStorage.removeItem("token");
    localStorage.removeItem("userID");
    localStorage.removeItem("username");

    // Redirect to login or home page
    navigate("/"); // Adjust the route as needed
  };

  return (
    <Menu>
      <MenuButton
        colorScheme="purple"
        backgroundColor="#9D8DF1"
        _hover={{ bg: "#9484E3" }}
        variant="solid"
        as={Button}
        rightIcon={<ChevronDownIcon />}
      >
        Welcome {username}!
      </MenuButton>
      <MenuList backgroundColor="#9D8DF1" p={0}>
        <MenuItem
          backgroundColor="#9D8DF1"
          _hover={{ bg: "#9484E3" }}
          onClick={handleLogout}
          m={0}
          p={3}
        >
          Log Out
        </MenuItem>
        <MenuItem
          backgroundColor="#9D8DF1"
          _hover={{ bg: "#9484E3" }}
          m={0}
          p={3}
        >
          Account Settings
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default AccountButton;

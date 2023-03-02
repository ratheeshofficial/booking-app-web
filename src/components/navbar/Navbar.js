import {
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  WrapItem,
} from "@chakra-ui/react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./navbar.css";

const Navbar = () => {
  const { user } = useContext(AuthContext);
  console.log("user", user);

  const name = user ? user.username : "";
  const capitalize = name.charAt(0).toUpperCase() + name.slice(1);
  const signOut = () => {
    localStorage.clear();
    window.location.href = "/";
  };
  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to={`/`}>
          <span className="logo">Booking</span>
        </Link>
        {user ? (
          <>
            <Menu>
              <MenuButton>
                <WrapItem>
                  <Avatar
                    size="sm"
                    name="Dan Abrahmov"
                    src="https://bit.ly/ryan-florence"
                  />
                  <Text ml="2" mt="1">
                    {capitalize}
                  </Text>
                </WrapItem>
              </MenuButton>
              <MenuList color="black">
                <MenuItem as="a" href="#">
                  Profile
                </MenuItem>
                <MenuItem as="a" href="#" onClick={signOut}>
                  Logout
                </MenuItem>
              </MenuList>
            </Menu>
            {/* <WrapItem>
              <Avatar
                size="sm"
                name="Dan Abrahmov"
                src="https://bit.ly/ryan-florence"
              />
              <Text ml="2" mt="1">
                {capitalize}
              </Text>
            </WrapItem> */}
          </>
        ) : (
          <div className="navItems">
            <Link to="/register">
              <button className="navButton">Register</button>
            </Link>
            <Link to="/login">
              <button className="navButton">Login</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;

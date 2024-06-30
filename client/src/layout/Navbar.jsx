import { Avatar, Dropdown, Navbar } from "flowbite-react";
import { getAuth, signOut } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slice/authslice";
import logo from "../assets/img/logo.png";

export default function NavbarComp() {
  const auth = getAuth();
  console.log(auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.userData);
  console.log(user);
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        toast.success("Logged out successfully");
        dispatch(logout());
        navigate("/login");
        console.log(user);
      })
      .catch((error) => {
        toast.error("Error logging out");
      });
  };

  return (
    <Navbar
      fluid
      rounded
      className={"sticky top-0 left-0 z-[99] bg-white shadow-md"}
    >
      <Navbar.Brand href="/">
        <img src={logo} className="mr-3 h-20" alt="Logo" />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white translate-y-[-0.5rem]">
          Save <span>Before</span> Spoil
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar
              alt="User settings"
              img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
              rounded
            />
          }
        >
          <Dropdown.Header>
            <span className="block text-sm">{user?.displayName}</span>
            <span className="block truncate text-sm font-medium">
              {user?.email}
            </span>
          </Dropdown.Header>
          <Dropdown.Item onClick={() => navigate("/profile")}>
            Profile
          </Dropdown.Item>
          <Dropdown.Item onClick={() => navigate("/dashboard-1")}>
            Dashboard
          </Dropdown.Item>

          <Dropdown.Item>Earnings</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item onClick={handleSignOut}>Sign out</Dropdown.Item>
        </Dropdown>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link href="#" active>
          Home
        </Navbar.Link>
        <Navbar.Link href="#">About</Navbar.Link>
        <Navbar.Link href="#">Services</Navbar.Link>
        <Navbar.Link href="#">Pricing</Navbar.Link>
        <Navbar.Link href="#">Contact</Navbar.Link>
      </Navbar.Collapse>
      <ToastContainer />
    </Navbar>
  );
}

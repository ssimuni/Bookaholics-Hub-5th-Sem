/* eslint-disable no-template-curly-in-string */
import { NavLink as ReactLink, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { doLogout, getCurrentUser, isLoggedIn } from '../auth';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,

} from 'reactstrap';

const CustomNavbar = () => {
  let navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [login, setLogin] = useState(false);
  const [user, setUser] = useState(undefined);
  useEffect(() => {
    setLogin(isLoggedIn());
    setUser(getCurrentUser());
  }, [login]);

  const toggle = () => setIsOpen(!isOpen);
  const logout = () => {
    doLogout(() => {
      setLogin(false);
      navigate("/");
    });
  }
  return (
    <div>
      <Navbar
        expand="md"
        // fixed="top"
        className="px-4 transparent-navbar"
        style={{
          background: 'rgba(0,0,0,0.5)',
          backdropFilter: 'blur(5px) brightness(1.3) hue-rotate(5deg) saturate(0.9)', // Adjusted blur and saturation
          border: "none",
        }}
      >
        <NavbarBrand tag={ReactLink} to="/" style={{ fontSize: '1.5em', fontWeight: 'bold', color: '#fff' }}>
          <img src="../logo2.png" style={{ height: '40px' }} alt="" />
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
            <NavItem>
              <NavLink tag={ReactLink} to="/about" style={{ color: 'white' }}>About</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={ReactLink} to="/contact" style={{ color: 'white' }}>
                Contact
              </NavLink>
            </NavItem>
            <NavLink tag={ReactLink} to="/services" style={{ color: 'white' }}>
              Our Terms and Policies
            </NavLink>
          </Nav>
          <Nav navbar>
            {/* general user */}
            {
              login && (user.role === "General") && (
                <>
                  <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret style={{ color: 'white' }}>
                      Market Place
                    </DropdownToggle>
                    <DropdownMenu >
                      <DropdownItem tag={ReactLink} to="/user/buysell" style={{ color: 'black' }}>Buy-Sell Section</DropdownItem>
                      <DropdownItem tag={ReactLink} to="/user/borrow" style={{ color: 'black' }}>Borrow Section</DropdownItem>
                      <DropdownItem tag={ReactLink} to="/user/exchange" style={{ color: 'black' }}>Exchange Section</DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                  <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret style={{ color: 'white' }}>
                      Requests
                    </DropdownToggle>
                    <DropdownMenu >
                      <DropdownItem tag={ReactLink} to={`/user/exchange-requests/${user.email}`} style={{ color: 'black' }}>Exchange Requests</DropdownItem>
                      <DropdownItem tag={ReactLink} to={`/user/borrow-requests/${user.email}`} style={{ color: 'black' }}>Borrow Requests</DropdownItem>
                      <DropdownItem tag={ReactLink} to={`/user/order-requests/${user.email}`} style={{ color: 'black' }}>Order Requests</DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>

                  <UncontrolledDropdown nav inNavbar direction='left'>
                    <DropdownToggle nav caret style={{ color: 'white' }}>
                      My Section
                    </DropdownToggle>
                    <DropdownMenu >
                      <DropdownItem tag={ReactLink} to={`/user/profile/${user.id}`} style={{ color: 'black' }}>My Profile</DropdownItem>
                      <UncontrolledDropdown nav inNavbar direction='down' className='text-black'>
                        <DropdownToggle nav caret className='text-black' >
                          My Posts
                        </DropdownToggle>
                        <DropdownMenu >
                          <DropdownItem tag={ReactLink} to={`/user/my-sell-posts/${user.email}`} style={{ color: 'black' }}>Sell Zone</DropdownItem>
                          <DropdownItem tag={ReactLink} to={`/user/my-borrow-posts/${user.email}`} style={{ color: 'black' }}>Borrow Zone</DropdownItem>
                          <DropdownItem tag={ReactLink} to={`/user/my-exchange-posts/${user.email}`} style={{ color: 'black' }}>Exchange Zone</DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                      <UncontrolledDropdown nav inNavbar direction='down' className='text-white'>
                        <DropdownToggle nav caret className='text-black' >
                          My Library
                        </DropdownToggle>
                        <DropdownMenu >
                          <DropdownItem tag={ReactLink} to={`/user/my-purchase/${user.email}`} style={{ color: 'black' }}>Purchased Books</DropdownItem>
                          <DropdownItem tag={ReactLink} to={`/user/my-borrow/${user.email}`} style={{ color: 'black' }}>Borrowed Books</DropdownItem>
                          <DropdownItem tag={ReactLink} to={`/user/my-exchange/${user.email}`} style={{ color: 'black' }}>Exchanged Books</DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                      <DropdownItem tag={ReactLink} to={`/user/my-sell-records/${user.email}`} style={{ color: 'black' }}>Sell Records</DropdownItem>
                      <DropdownItem tag={ReactLink} to={`/user/my-lend-records/${user.email}`} style={{ color: 'black' }}>Lend Records</DropdownItem>
                      <DropdownItem tag={ReactLink} to={`/user/my-exchange-records/${user.email}`} style={{ color: 'black' }}>Exchange Records</DropdownItem>
                      <DropdownItem divider />
                      <DropdownItem onClick={logout} style={{ color: 'black' }}>Log Out</DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </>
              )
            }
            {/* publisher */}
            {
              login && (user.role === "Publisher") && (
                <>
                  <NavItem>
                    <NavLink tag={ReactLink} to="/user/buysell" style={{ color: 'white' }}>Market Place</NavLink>
                  </NavItem>
                  <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret style={{ color: 'white' }}>
                      My Section
                    </DropdownToggle>
                    <DropdownMenu >
                      <DropdownItem tag={ReactLink} to={`/user/profile/${user.id}`} style={{ color: 'black' }}>My Profile</DropdownItem>
                      <DropdownItem tag={ReactLink} to={`/user/order-requests/${user.email}`} style={{ color: 'black' }}>Order Requests</DropdownItem>
                      <DropdownItem tag={ReactLink} to={`/user/my-sell-posts/${user.email}`} style={{ color: 'black' }}>My Sell Posts</DropdownItem>
                      <DropdownItem tag={ReactLink} to={`/user/my-sell-records/${user.email}`} style={{ color: 'black' }}>My Sell Records</DropdownItem>

                      <DropdownItem divider />
                      <DropdownItem onClick={logout} style={{ color: 'black' }}>Log Out</DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>


                </>
              )
            }
            {/* admin */}
            {
              login && (user.role === "Admin") && (
                <>
                  <NavItem>
                    <NavLink tag={ReactLink} to="/admin/all-user" style={{ color: 'white' }}>User Records</NavLink>
                  </NavItem>
                  <UncontrolledDropdown nav inNavbar direction='left'>
                    <DropdownToggle nav caret style={{ color: 'white' }}>
                      Others
                    </DropdownToggle>
                    <DropdownMenu >
                      <DropdownItem tag={ReactLink} to={`/user/profile/${user.id}`}>My Profile</DropdownItem>
                      <UncontrolledDropdown nav inNavbar direction='left' className='text-black'>
                        <DropdownToggle nav caret className='text-black' >
                          Transactions
                        </DropdownToggle>
                        <DropdownMenu >
                          <DropdownItem tag={ReactLink} to={`/admin/buy-sell-transaction`} style={{ color: 'black' }}>Buy Sell Details</DropdownItem>
                          <DropdownItem tag={ReactLink} to={`/admin/borrow-transaction`} style={{ color: 'black' }}>Borrow Details</DropdownItem>
                          <DropdownItem tag={ReactLink} to={`/admin/exchange-transaction`} style={{ color: 'black' }}>Exchange Details</DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                      <UncontrolledDropdown nav inNavbar direction='left' className='text-black'>
                        <DropdownToggle nav caret className='text-black' >
                          Records
                        </DropdownToggle>
                        <DropdownMenu >
                          <DropdownItem tag={ReactLink} to={`/admin/all-buy-sell-post`} style={{ color: 'black' }}>Posts for Buy Sell</DropdownItem>
                          <DropdownItem tag={ReactLink} to={`/admin/all-borrow-post`} style={{ color: 'black' }}>Posts for Borrow </DropdownItem>
                          <DropdownItem tag={ReactLink} to={`/admin/all-exchange-post`} style={{ color: 'black' }}>Posts for Exchange</DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                      {/* <DropdownItem tag={ReactLink} to={`/admin/`}></DropdownItem>
                    <DropdownItem tag={ReactLink} to={`/admin/`}></DropdownItem> */}

                      <DropdownItem divider />
                      <DropdownItem onClick={logout}>Log Out</DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>

                </>
              )
            }

            {
              !login && (
                <>
                  <NavItem>
                    <NavLink tag={ReactLink} to="/signup" style={{ color: 'white' }}>Sign up</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink tag={ReactLink} to="/signin" style={{ color: 'white' }}>Sign in</NavLink>
                  </NavItem>
                </>
              )
            }
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}
export default CustomNavbar;
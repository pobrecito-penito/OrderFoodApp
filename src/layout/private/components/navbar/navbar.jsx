import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { deleteUser } from '../../../../services/auth.service';

const NavBar = () => {

    const logOut = () => {
      deleteUser();
    }

    return(
        <Navbar bg="light" variant="light">
    <Navbar.Brand href="/">Welcome</Navbar.Brand>
    <Nav className="mr-auto">
      <Nav.Link href="/">Home</Nav.Link>
      <Nav.Link href="/polls">Polls</Nav.Link>
      <Nav.Link href="/order">Orders</Nav.Link>
      {localStorage.getItem('role') === 'admin' ? <Nav.Link href="/admin">Admin</Nav.Link> : <div></div>}
    </Nav>
    <Navbar.Collapse className="justify-content-end">
    <Navbar.Text>
        Signed in as: <a href="/login" onClick={() => logOut()}>{localStorage.getItem('username')}</a>
    </Navbar.Text>
  </Navbar.Collapse>
  </Navbar>
    )
}

export default NavBar
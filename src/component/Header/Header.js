import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import { Navbar ,NavbarBrand, NavItem, Nav,NavLink} from 'reactstrap'

class Header extends Component {

    render() {

    return (

        <Navbar color="light" light expand="md">
          <NavbarBrand className="link" >
          <NavLink tag={Link} activeClassName="active" to="/">Home</NavLink></NavbarBrand>
          <Nav className="mr-auto" nav-auto>
            <NavItem className="link">
              <NavLink tag={Link} activeClassName="active" to="/create">Add</NavLink>
            </NavItem>
           
            <NavItem className="link">
              <NavLink tag={Link} activeClassName="active" to="/show/:id">Show</NavLink>

            </NavItem>
          </Nav>
        </Navbar>
    )
  }
}
export default Header
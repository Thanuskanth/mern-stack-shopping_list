import React, { Component, Fragment } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Container, NavbarBrand, NavbarToggler, Collapse, Nav, NavItem } from 'reactstrap';
import Register from './register.component';
import Logout from './logout.component';
import Login from './login.component';
import { connect } from 'react-redux';
class NavBar extends Component {
    state = {
        isOpen: false
    }
    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }
    render() {
        const { user, isauthenticated } = this.props.auth;
        const authlink =
            (<Fragment>

                {user ? <span className="navbar-text mr-3"><strong>welcome {user.username}</strong></span> : ""}
                <NavItem >
                    <Logout />
                </NavItem>
            </Fragment>)
        const guestlink =
            (<Fragment>
                <NavItem >
                    <Register />

                </NavItem>
                <NavItem >
                    <Login />

                </NavItem>
            </Fragment>)

        return (

            <div>
                <Navbar color="dark" dark expand="sm" className="mb-5">
                    <Container>
                        <NavbarBrand href={'/'}>Shopping List</NavbarBrand>
                        <NavbarToggler onClick={this.toggle} />
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="ml-auto" navbar >

                                {isauthenticated ? authlink : guestlink}
                            </Nav>
                        </Collapse>
                    </Container>
                </Navbar>
            </div>

        )
    }
}
const mapstateToProps = (state) => ({
    auth: state.auth
})
export default connect(mapstateToProps, {})(NavBar);
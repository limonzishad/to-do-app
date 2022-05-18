import React from "react";
import './Header.css';
import { Link } from "react-router-dom";
import { Container, Nav, Navbar } from "react-bootstrap";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import { signOut } from "firebase/auth";

const Header = () => {
    const [user] = useAuthState(auth);
    const handleLogout = () => {
        signOut(auth);
    };

    return (
        <Navbar className="bg-color" expand="lg">
            <Container>
                <Navbar.Brand>TO-DO APP</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        {
                            user ?
                                <Nav.Link className="active-color" onClick={handleLogout}>LOGOUT</Nav.Link>
                                :
                                <Nav.Link className="active-color" as={Link} to="/login">LOGIN/REGISTER</Nav.Link>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;
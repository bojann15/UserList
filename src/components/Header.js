import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';

const Header = () => {
    return (
        <header >
            <Navbar bg="dark" variant="dark" expand="lg" >
                <Container>
                    <Nav className="mr-auto">
                        <h1 style={{ color: "white" }}>User List</h1>
                    </Nav>
                </Container>
            </Navbar>
        </header >
    )
};
export default Header;
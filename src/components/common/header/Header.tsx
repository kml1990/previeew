import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

import './Header.scss';

export interface HeaderProps {
    className: string;
}

const Header: React.FC<HeaderProps> = ({ className }) => {
    return (
        <Navbar className={`Header ${className}`} bg="light" expand="lg">
            <Navbar.Brand href="#home">Previeew</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <div className="mr-auto" />
                <Nav>
                    <Nav.Link href="https://github.com/kml1990/previeew" target="_blank">
                        <FontAwesomeIcon className="Header__githubIcon" icon={faGithub} />
                        Github
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default React.memo(Header);

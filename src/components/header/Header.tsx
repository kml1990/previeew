import React from 'react';
import { Navbar, Nav, Form, FormControl } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Button, { ButtonVariant } from '../common/Button/Button';

import './Header.scss';

export interface HeaderProps {
    className: string;
}

const Header: React.FC<HeaderProps> = ({ className }) => {

    const onSearchClick = () => {
        console.log('clicked')
    }

    return (
        <Navbar className={`Header ${className}`} bg="light" expand="lg">
            <Navbar.Brand href="#home">Previeew</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Form className="mr-auto" inline>
                    <FormControl
                        type="text"
                        placeholder="Enter Url"
                        className="mr-sm-2"
                    />
                    <Button text="Search" variant={ButtonVariant.PRIMARY} icon={faSearch} onClick={onSearchClick} />
                </Form>
                <Nav>
                    <Nav.Link href="https://github.com/kml1990/previeew" target="_blank">
                        <FontAwesomeIcon className="Header__githubIcon" icon={faGithub} />Github</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default React.memo(Header);

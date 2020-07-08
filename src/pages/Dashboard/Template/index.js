// library
import React, { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom';
import $ from 'jquery';

// third party component
import {
  Container,
  Col,
  Row,

  // NavLink, NavItem, 

  Nav,
  Navbar,
  NavbarToggler,
  NavbarBrand,

  // NavbarText,

  Collapse,
} from 'reactstrap';
// import Swal from 'sweetalert2';

// assets
import { bookIcon } from 'assets';

// fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons'

// custom config
import { useEventListener } from 'utils';

// custom style
import style from './dashboard.module.css';

const Template = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [sidebarOpened, setSidebarOpened] = useState(false);
  const [contentWidth, setContentWidth] = useState(0);
  const [user, setUSer] = useState({
    id: 0,
    name: 'name',
    role: 0,
    image: ''
  });

  const toggle = () => setIsOpen(!isOpen);
  const toggleSidebar = () => {
    if (sidebarOpened === false) {
      setSidebarOpened(!sidebarOpened)
      $(document).find('#sidebar').attr('class', `${style.sidebarOpened}`)
    } else {
      setSidebarOpened(!sidebarOpened)
      $(document).find('#sidebar').attr('class', `${style.sidebar}`)
    }
  }

  useEffect(() => {
    document.title = `Dashboard | ${props.title}`;
    setUSer(props.state);
  }, [props])


  function updateDimensions() {
    const width = $('#content').width()
    setContentWidth(width);
    $('#navbar').width(contentWidth);
  }
  const handler = useCallback(() => {
    updateDimensions();
  }, [contentWidth])
  useEventListener('resize', handler);

  const Components = props.components;

  return (
    <Container fluid className={style.container}>
      <Row classID={style.wrapper}>
        {/* Sidebar */}
        <div className={style.sidebar} id="sidebar">
          {/* Sidebar Toggle */}
          <Row>
            <div className={style.sidebarToggle1} onClick={() => toggleSidebar()}>
              <FontAwesomeIcon icon={faBars} className={style.sidebarToggleIcon} />
            </div>
          </Row>
          {/* Profile Preview */}
          <Row>
            <div className={style.profile}>
              {/* Profile Avatar */}
              <Row>
                <Col className={style.profileAvatar}>
                  <img src={user.image} alt="" />
                  {/* <img src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-1.2.1&auto=format&fit=crop&w=1441&q=80" alt="" /> */}
                </Col>
              </Row>
              {/* Profile Name */}
              <Row>
                <Col className={style.profileName}>
                  {user.name}
                </Col>
              </Row>
            </div>
          </Row>
          {/* Navigation */}
          <Row>
            <div className={style.navigation}>
              <Nav vertical className={style.nav}>
                <Link className="nav-link" to="/home">Explore</Link>
                <Link className="nav-link" to="/dashboard">Dashboard</Link>
                <Link className="nav-link" to="/logout">Log Out</Link>
              </Nav>
            </div>
          </Row>
        </div>

        {/* Content */}
        <Col className={style.content} id="content">
          {/* Navbar */}
          <Row>
            <Col style={{ padding: '0px' }}>
              <Navbar color="white" light expand="md" className={style.navbar} id="navbar">
                <div className={style.sidebarToggle2} onClick={() => toggleSidebar()}>
                  <FontAwesomeIcon icon={faBars} className={style.sidebarToggleIcon} />
                </div>
                {/* navbar brand top */}
                <NavbarBrand href="/" id={style.navbarBrandTop}>
                  <img src={bookIcon} alt="" />Library
									</NavbarBrand>
                <NavbarToggler onClick={() => toggle()} style={{ border: 'none' }} />
                <Collapse isOpen={isOpen} navbar>
                  {/* navbar menu */}
                  <Nav className="mr-auto" navbar>
                    {
                      [
                        { name: 'Books', to: 'dashboard/books' },
                        { name: 'Genres', to: 'dashboard/genres' },
                        { name: 'Authors', to: 'dashboard/authors' },
                        { name: 'Users', to: 'dashboard/users' },
                        { name: 'Profile', to: 'dashboard/profile' }
                      ].map((menu, index) => {
                        return (
                          <Link key={index} className="nav-link" to={`/${menu.to}`} onClick={() => document.title = `Dashboard | ${menu.name}`}>{menu.name}</Link>
                        )
                      })
                    }

                  </Nav>
                </Collapse>
                {/* navbar brand bottom */}
                <NavbarBrand href="/" id={style.navbarBrandBottom}>
                  <img src={bookIcon} alt="" />Library
									</NavbarBrand>
              </Navbar>
            </Col>
          </Row>
          <Row>
            <Col md="12">
              {Components}
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  )
}

export default Template;
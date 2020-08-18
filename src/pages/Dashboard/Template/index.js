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
import { appConfig } from 'configs';

const Template = (props) => {
  const [auth, setAuth] = useState(props.auth)
  const [isOpen, setIsOpen] = useState(false);
  const [sidebarOpened, setSidebarOpened] = useState(false);
  const [contentWidth, setContentWidth] = useState(0);

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
    const width = $('#content').width()
    $('#navbar').width(width);
    document.title = `Dashboard | ${props.title}`;
  }, [props])

  useEffect(() => {
    setAuth({
      image: props.auth.image,
      full_name: props.auth.full_name
    })
  }, [props.auth])

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
                  <img src={appConfig.url.assets + '/' + auth.image} alt="" />
                  {/* <img src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-1.2.1&auto=format&fit=crop&w=1441&q=80" alt="" /> */}
                </Col>
              </Row>
              {/* Profile Name */}
              <Row>
                <Col className={style.profileName}>
                  {auth.full_name}
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
                  <img src={bookIcon} alt="" />Al Maktabah
									</NavbarBrand>
                <NavbarToggler onClick={() => toggle()} style={{ border: 'none' }} />
                <Collapse isOpen={isOpen} navbar>
                  {/* navbar menu */}
                  <Nav className="mr-auto" navbar style={{ display: `${auth.role > 2 ? 'block' : 'none'}` }}>
                    {
                      [
                        { name: 'Profile', to: 'dashboard/profile' }
                      ].map((menu, index) => {
                        return (
                          <Link key={index} className="nav-link" to={`/${menu.to}`} onClick={() => document.title = `Dashboard | ${menu.name}`}>{menu.name}</Link>)
                      })
                    }

                  </Nav>
                  <Nav className="mr-auto" navbar style={{ display: `${auth.role > 2 ? 'none' : 'display'}` }}>
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
                  <img src={bookIcon} alt="" />Al Maktabah
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
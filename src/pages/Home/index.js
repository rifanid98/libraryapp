import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { 
	Container, 
	Col, 
	Row, 
	
	FormGroup, 
	Label, 
	Input, 
	Button, 
	Form, 
	
	NavLink,
	NavItem,
	Nav,

	Collapse,
	Navbar,
	NavbarToggler,
	NavbarBrand,
	UncontrolledDropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
	NavbarText
 } from 'reactstrap';
import $ from 'jquery';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faSearch } from '@fortawesome/free-solid-svg-icons'

import style from './home.module.css';

export default class Home extends Component {
	constructor(props) {
		document.title = `Home`;
		super(props)
		this.state = {
			isOpen: false,
			sidebarOpened: false
		}
	}
	
	// const [isOpen, setIsOpen] = useState(false);
	toggle = () => {
		this.state.isOpen === true 
			? this.setState({ ...this.state, isOpen: false })
			: this.setState({ ...this.state, isOpen: true });
	}

	toggleSidebar = () => {
		this.state.sidebarOpened === false
			? this.setState({ ...this.state, sidebarOpened: true }, () => {
				$(document).find('#sidebar').attr('class', 'home_sidebarOpened__1eo8p')
			})
			: this.setState({ ...this.state, sidebarOpened: false }, () => {
				$(document).find('#sidebar').attr('class', 'home_sidebar__jbvkE')
			})
	}

	render() {
		return (
			<Container fluid className={style.container}>
				<Row classID={style.wrapper}>
					{/* Sidebar */}
					<div className={style.sidebar} id="sidebar">
						{/* Sidebar Toggle */}
						<Row>
							<div className={style.sidebarToggle1} onClick={this.toggleSidebar}>
								<FontAwesomeIcon icon={faBars} className={style.sidebarToggleIcon} />
							</div>
						</Row>
						{/* Profile Preview */}
						<Row>
							<div className={style.profile}>
								{/* Profile Avatar */}
								<Row>
									<Col className={style.profileAvatar}>
										<img src="https://via.placeholder.com/150" alt=""/>
									</Col>
								</Row>
								{/* Profile Name */}
								<Row>
									<Col className={style.profileName}>
										Niki Zefanya
									</Col>
								</Row>
							</div>
						</Row>
						{/* Navigation */}
						<Row>
							<div className={style.navigation}>
								<Nav vertical className={style.nav}>
									<Link className="nav-link" to="/login">Explore</Link>
									<Link className="nav-link" to="/signup">History</Link>
									<Link className="nav-link" to="/adada">Add Book*</Link>
								</Nav>
							</div>
						</Row>
					</div>

					{/* Content */}
					<Col className={style.content}>
						<Row>
							<Col md="12" style={{padding: '0px'}}>
								<Navbar color="white" light expand="md" fixed="">
									<div className={style.sidebarToggle2} onClick={this.toggleSidebar}>
										<FontAwesomeIcon icon={faBars} className={style.sidebarToggleIcon}/>
									</div>
									<NavbarBrand href="/" id={style.navbarBrandTop}>
										LibraryLibrary
									</NavbarBrand>
									<NavbarToggler onClick={this.toggle} style={{border: 'none'}} />
									<Collapse isOpen={this.state.isOpen} navbar>
										<Nav className="mr-auto" navbar>
											<UncontrolledDropdown nav inNavbar>
												<DropdownToggle nav caret>
													All Categories
												</DropdownToggle>
												<DropdownMenu right>
													<DropdownItem> Option 1 </DropdownItem>
													<DropdownItem> Option 2 </DropdownItem>
													<DropdownItem divider />
													<DropdownItem> Reset </DropdownItem>
												</DropdownMenu>
											</UncontrolledDropdown>
											<UncontrolledDropdown nav inNavbar>
												<DropdownToggle nav caret>
													All Times
												</DropdownToggle>
												<DropdownMenu right>
													<DropdownItem> Option 1 </DropdownItem>
													<DropdownItem> Option 2 </DropdownItem>
													<DropdownItem divider />
													<DropdownItem> Reset </DropdownItem>
												</DropdownMenu>
											</UncontrolledDropdown>
										</Nav>
										<form className="mx-2 my-auto d-inline w-100">
											<div className="input-group">
												<div id={style.space}></div>
												<span className="input-group-append">
													<button className={style.searchButton} onClick={(e)=>{e.preventDefault()}}>
														<FontAwesomeIcon icon={faSearch} className={style.searchIcon} />
													</button>
												</span>
												<input type="text" className="form-control" id={style.searchInput} placeholder="Search Book" />
												<div id={style.space}></div>
											</div>
										</form>
									</Collapse>
									<NavbarBrand href="/" id={style.navbarBrandBottom}>
										LibraryLibrary
									</NavbarBrand>
								</Navbar>
							</Col>
						</Row>
					</Col>
				</Row>
			</Container>
		)
  	}
}
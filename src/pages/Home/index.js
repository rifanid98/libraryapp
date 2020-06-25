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
			isOpen: false
		}
	}
	// const [isOpen, setIsOpen] = useState(false);
	toggle = () => {
		this.state.isOpen === true 
			? this.setState({ ...this.state, isOpen: false })
			: this.setState({ ...this.state, isOpen: true });
	}

	render() {
		return (
			<Container fluid className={style.container}>
				<Row classID={style.wrapper}>
					
					<Col className={style.content} md="12">
						<Row>
							<Col md="12" style={{padding: '0px'}}>
								<Navbar color="white" light expand="md" fixed="">
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
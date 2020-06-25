// library
import React, { Component } from 'react'
import { Link } from 'react-router-dom';

// bootstrap
import { 
	Container, 
	Col, 
	Row, 
	
	Form, 
	FormGroup, 
	Label, 
	Input, 
	Button, 
	
	NavLink, NavItem, Nav,
	Navbar, NavbarToggler, 
	NavbarBrand, NavbarText,
	
	Collapse, 
	UncontrolledDropdown, 
	DropdownToggle, DropdownMenu, DropdownItem,

	Card, CardImg, CardText, CardBody,
	CardTitle, CardSubtitle
 } from 'reactstrap';
import $ from 'jquery';

// fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faSearch } from '@fortawesome/free-solid-svg-icons'

// slider
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// custom style
import style from './home.module.css';

export default class Home extends Component {
	constructor(props) {
		document.title = `Home`;
		super(props)
		this.state = {
			isOpen: false,
			sidebarOpened: false,

			oldSlide: 0,
			activeSlide: 0,
			activeSlide2: 0,

			content: {
				width: 0
			}
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

	updateDimensions = () => {
		this.setState({ 
			...this.state,
			content: {
				width: $('#content').width()
			}
		}, () => {
				$('#navbar').width(this.state.content.width);
		});
	};

	componentDidMount() {
		window.addEventListener('resize', this.updateDimensions);
		
		const contentWidth = $('#content').width();
		$('#navbar').width(contentWidth);
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.updateDimensions);
	}

	render() {
		const settings = {
			dots: true,
			infinite: true,
			speed: 1000,
			slidesToShow: 1,
			slidesToScroll: 1,
			// beforeChange: (current, next) =>
			// 	console.log(current),
			// afterChange: current => this.setState({ activeSlide2: current })
			beforeChange: (current, next) =>
				this.setState({ oldSlide: current, activeSlide: next }),
			afterChange: current => this.setState({ activeSlide2: current })
		};

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
										<img src="http://localhost:3000/avatar.jpeg" alt=""/>
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
					<Col className={style.content} id="content">
						{/* Navbar */}
						<Row>
							<Col style={{padding: '0px'}}>
								<Navbar color="white" light expand="md" className={style.navbar} id="navbar">
									<div className={style.sidebarToggle2} onClick={this.toggleSidebar}>
										<FontAwesomeIcon icon={faBars} className={style.sidebarToggleIcon}/>
									</div>
									<NavbarBrand href="/" id={style.navbarBrandTop}>
										<img src="http://localhost:3000/book.png" alt=""/>Library
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
										<img src="http://localhost:3000/book.png" alt=""/>Library
									</NavbarBrand>
								</Navbar>
							</Col>
						</Row>
						{/* slider */}
						<Row>
							<Col className={style.slider}>
								<div>
									<h2>beforeChange and afterChange hooks</h2>
									<p>
										BeforeChange => oldSlide: <strong>{this.state.oldSlide}</strong>
									</p>
									<p>
										BeforeChange => activeSlide: <strong>{this.state.activeSlide}</strong>
									</p>
									<p>
										AfterChange => activeSlide: <strong>{this.state.activeSlide2}</strong>
									</p>
									<Slider {...settings}>
										<div>
											<h3>1</h3>
										</div>
										<div>
											<h3>2</h3>
										</div>
										<div>
											<h3>3</h3>
										</div>
										<div>
											<h3>4</h3>
										</div>
										<div>
											<h3>5</h3>
										</div>
										<div>
											<h3>6</h3>
										</div>
									</Slider>
								</div>
							</Col>
						</Row>
						{/* Book Lists */}
						<Row>
							<Col className={style.bookLists}>
								<p>Book Lists</p>
								<Row>
									
									<Col md="3" sm="4" xs="6" onClick={() => { this.props.history.push('/login') }}>
										<Card className={style.card} style={{backgroundImage: 'url(http://localhost:3000/avatar.jpeg)'}}>
											<div className={style.imgWrapper}>
											</div>
											<CardBody className={style.cardBody}>
												<CardTitle className={style.cardTitle}>Card title</CardTitle>
												<CardText className={style.cardText}>Some quick example text to build on the...</CardText>
											</CardBody>
										</Card>
									</Col>
									<Col md="3" sm="4" xs="6" onClick={() => { this.props.history.push('/login') }}>
										<Card className={style.card} style={{backgroundImage: 'url(http://localhost:3000/avatar.jpeg)'}}>
											<div className={style.imgWrapper}>
											</div>
											<CardBody className={style.cardBody}>
												<CardTitle className={style.cardTitle}>Card title</CardTitle>
												<CardText className={style.cardText}>Some quick example text to build on the...</CardText>
											</CardBody>
										</Card>
									</Col>
									<Col md="3" sm="4" xs="6" onClick={() => { this.props.history.push('/login') }}>
										<Card className={style.card} style={{backgroundImage: 'url(http://localhost:3000/avatar.jpeg)'}}>
											<div className={style.imgWrapper}>
											</div>
											<CardBody className={style.cardBody}>
												<CardTitle className={style.cardTitle}>Card title</CardTitle>
												<CardText className={style.cardText}>Some quick example text to build on the...</CardText>
											</CardBody>
										</Card>
									</Col>
									<Col md="3" sm="4" xs="6" onClick={() => { this.props.history.push('/login') }}>
										<Card className={style.card} style={{backgroundImage: 'url(http://localhost:3000/avatar.jpeg)'}}>
											<div className={style.imgWrapper}>
											</div>
											<CardBody className={style.cardBody}>
												<CardTitle className={style.cardTitle}>Card title</CardTitle>
												<CardText className={style.cardText}>Some quick example text to build on the...</CardText>
											</CardBody>
										</Card>
									</Col>
									<Col md="3" sm="4" xs="6" onClick={() => { this.props.history.push('/login') }}>
										<Card className={style.card} style={{backgroundImage: 'url(http://localhost:3000/avatar.jpeg)'}}>
											<div className={style.imgWrapper}>
											</div>
											<CardBody className={style.cardBody}>
												<CardTitle className={style.cardTitle}>Card title</CardTitle>
												<CardText className={style.cardText}>Some quick example text to build on the...</CardText>
											</CardBody>
										</Card>
									</Col>
								</Row>
							</Col>
						</Row>
					</Col>
				</Row>
			</Container>
		)
  	}
}
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
	// Textarea
	
	// NavLink, NavItem, 
	
	Nav,
	Navbar, NavbarToggler, 
	NavbarBrand, 
	
	// NavbarText,
	
	Collapse, 
	UncontrolledDropdown, 
	DropdownToggle, DropdownMenu, DropdownItem,

	Card, 
	// CardImg, 
	CardText, CardBody,
	CardTitle, 
	// CardSubtitle,

	// Jumbotron
 } from 'reactstrap';
import { Textarea as MdTextarea } from 'reactstrap-md-textarea';

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
import MyModal from '../../components/organisms/MyModal';

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

			modalOpen: false,

			content: {
				width: 0
			},
			mdTxt: "",
			instanceKey: false
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

	onChange = (stateName, value) => {
		this.setState({ ...this.state, [stateName]: value })
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

		const modalBody = <div>
			<Form>
				<FormGroup>
					<Label for="exampleEmail">Image</Label>
					<Input type="file" name="image" id="" />
				</FormGroup>
				<FormGroup>
					<Label for="">Title</Label>
					<Input type="text" name="title" id="" placeholder="title here" />
				</FormGroup>
				<FormGroup>
					<Label for="">Description</Label>
					<MdTextarea
						rows={10}
						onChange={(e) => this.onChange('mdTxt', e.target.value)}
						value={this.state.mdTxt}
						allowFilteredHtml={true}
					/>
				</FormGroup>
				<Button color="warning" className="float-right">Save</Button>
			</Form>
		</div>

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
										<img src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-1.2.1&auto=format&fit=crop&w=1441&q=80" alt=""/>
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
									<MyModal id="buka" modalTitle="Add Data" modalBody={modalBody} size="lg"/>
									<Link className="nav-link" to="#" onClick={() => { $('#buka').click()}}>Add Book*</Link>
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
								<Slider {...settings}>
									<div>
										<h1>1</h1>
									</div>
									<div>
										<h1>1</h1>
									</div>
									<div>
										<h1>1</h1>
									</div>
									<div>
										<h1>1</h1>
									</div>
								</Slider>
							</Col>
						</Row>
						{/* Book Lists */}
						<Row>
							<Col className={style.bookLists}>
								<p>Book Lists</p>
								<Row>
									<Col md="3" sm="4" xs="6" onClick={() => { this.props.history.push('/detail') }}>
										<Card className={style.card} style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-1.2.1&auto=format&fit=crop&w=1441&q=80)'}}>
											<div className={style.imgWrapper}>
											</div>
											<CardBody className={style.cardBody}>
												<CardTitle className={style.cardTitle}>Card title</CardTitle>
												<CardText className={style.cardText}>Some quick example text to build on the...</CardText>
											</CardBody>
										</Card>
									</Col>
									<Col md="3" sm="4" xs="6" onClick={() => { this.props.history.push('/detail') }}>
										<Card className={style.card} style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-1.2.1&auto=format&fit=crop&w=1441&q=80)'}}>
											<div className={style.imgWrapper}>
											</div>
											<CardBody className={style.cardBody}>
												<CardTitle className={style.cardTitle}>Card title</CardTitle>
												<CardText className={style.cardText}>Some quick example text to build on the...</CardText>
											</CardBody>
										</Card>
									</Col>
									<Col md="3" sm="4" xs="6" onClick={() => { this.props.history.push('/detail') }}>
										<Card className={style.card} style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-1.2.1&auto=format&fit=crop&w=1441&q=80)'}}>
											<div className={style.imgWrapper}>
											</div>
											<CardBody className={style.cardBody}>
												<CardTitle className={style.cardTitle}>Card title</CardTitle>
												<CardText className={style.cardText}>Some quick example text to build on the...</CardText>
											</CardBody>
										</Card>
									</Col>
									<Col md="3" sm="4" xs="6" onClick={() => { this.props.history.push('/detail') }}>
										<Card className={style.card} style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-1.2.1&auto=format&fit=crop&w=1441&q=80)'}}>
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
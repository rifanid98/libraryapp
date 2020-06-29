// library
import React, { Component } from 'react'
import { Link } from 'react-router-dom';

// third party component
import {
	Container, Col, Row,

	Form,
	FormGroup,
	Label,
	Input,
	Button,

	// Form, 
	Nav,
	Jumbotron
} from 'reactstrap';
import { Textarea as MdTextarea } from 'reactstrap-md-textarea';
import $ from 'jquery';
import Swal from 'sweetalert2';

// custom component
import { MyModal } from 'components';

// style
import style from './detail.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

export default class Detail extends Component {
	constructor(props) {
		document.title = `Detail`;
		super(props)
		this.state = {
			mdTxt: ''
		}
	}

	render() {
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
				{/* navbar tools */}
				<div className={style.navbarTools}>
					{/* back button */}
					<div className={style.backButton} onClick={() => { this.props.history.push('/home') }}>
						<FontAwesomeIcon icon={faArrowLeft} className={style.backButtonIcon} />
					</div>
					{/* admin menu */}
					<div className={style.adminMenu}>
						<MyModal id="buka" modalTitle="Edit Data" modalBody={modalBody} size="lg" />
						<Nav>
							<Link to="#" onClick={() => { $('#buka').click() }}>Edit</Link>
							<Link to="#" onClick={() => {
								Swal.fire({
									title: '<strong>Data ID #</strong>',
									icon: 'success',
									html: 'Data <strong>Dilan 2012</strong> Berhasil Dihapus!',
									showCloseButton: true,
									focusConfirm: true
								}).then((result) => {

								})
							}}>Delete</Link>
						</Nav>
					</div>
				</div>
				{/* Jumbotron */}
				<Row>
					<Col className={style.headline}>
						<Jumbotron fluid className={style.jumbotron} style={{ background: 'url(https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-1.2.1&auto=format&fit=crop&w=1441&q=80)' }}>
						</Jumbotron>
					</Col>
				</Row>
				{/* Book */}
				<Row>
					{/* Description */}
					<Col md="9" className={style.description}>
						<Row>
							{/* title */}
							<Col md="9" sm="9" className={style.title}>
								<span>Novel</span>
								<h1>DILAN 1990</h1>
								<small>30 Juni 2019</small>
							</Col>
							{/* status */}
							<Col md="3" sm="3" className={style.status}>
								<p>Available</p>
							</Col>
						</Row>
						<Row>
							{/* Text */}
							<Col className={style.text}>
								Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
						</Col>
						</Row>
					</Col>
					{/* Borrow */}
					<Col md="3" className={style.borrow} >
						<Row>
							<div className={style.image} style={{ background: 'url(https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-1.2.1&auto=format&fit=crop&w=1441&q=80)' }}></div>
						</Row>
						<Row>
							<div className={style.buttonWrapper}>
								<Button size="lg" className={style.button}>Borrow</Button>
							</div>
						</Row>
					</Col>
				</Row>
			</Container>
		)
	}
}
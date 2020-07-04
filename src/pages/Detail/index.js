// library
import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import Axios from 'axios';
import jwtDecode from 'jwt-decode';

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

// custom config
import { apiUri } from 'configs';

// style
import style from './detail.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

export default class Detail extends Component {
	constructor(props) {
		document.title = `Detail`;
		super(props)
		this.state = {
			mdTxt: '',
			book: {
				book_id: this.props.match.params.id
			},
			user: {
				id: 0,
				name: '',
				role: 0
			},
			genres: [],
			authors: [],
			status: [0, 1],
			pendingHistories: []
		}

	}
	componentDidMount() {
		this.checkAuth();
		this.getDetailBooks();
		this.getAuthors();
		this.getCategories();
		this.checkBorrowedBook();
	}
	// MdTextarea
	onChange = (stateName, value) => {
		this.setState({ ...this.state, [stateName]: value })
	}
	convertDate = (myDate, showTime = true) => {
		const newDate = new Date(myDate);
		const year = newDate.getFullYear();
		const month = (newDate.getMonth() + 1) < 10 ? `0${newDate.getMonth() + 1}` : newDate.getMonth() + 1;
		const date = newDate.getDate() < 10 ? `0${newDate.getDate()}` : newDate.getDate();
		const hours = newDate.getHours() < 10 ? `0${newDate.getHours()}` : newDate.getHours();
		const minutes = newDate.getMinutes() < 10 ? `0${newDate.getMinutes()}` : newDate.getMinutes();
		const seconds = newDate.getSeconds() < 10 ? `0${newDate.getSeconds()}` : newDate.getSeconds();

		return showTime ? `${year}-${month}-${date} ${hours}:${minutes}:${seconds}` : `${year}-${month}-${date}`;
	}

	checkAuth = () => {
		const token = sessionStorage.getItem('token') || localStorage.getItem('token');
		if (!token) {
			this.props.history.push('/login');
		} else {
			const userData = jwtDecode(token);
			if (userData.user_id === undefined || null) {
				this.props.history.push('/login');
			}
			this.setState({
				...this.state,
				user: {
					id: userData.user_id,
					name: userData.name,
					role: userData.role
				}
			})
		}
	}
	getDetailBooks = async () => {
		const token = sessionStorage.getItem('token') || localStorage.getItem('token');
		await Axios({
			method: 'GET',
			url: `${apiUri.books.getDetailBook}/${this.state.book.book_id}`,
			headers: {
				authorization: token
			}
		}).then((res) => {
			// console.log(res);
			const book = res.data.data;
			this.setState({
				...this.state,
				book: book[0],
				mdTxt: book[0].description
			})
		}).catch((error) => {
			console.log(error.response)
			console.log(`get books failed`)
		})
	}
	getCategories = async () => {
		const token = sessionStorage.getItem('token') || localStorage.getItem('token');
		await Axios({
			method: 'GET',
			url: `${apiUri.genres.getAllGenres}`,
			headers: {
				authorization: token
			}
		}).then((res) => {
			// console.log(res);
			const genres = res.data.data;
			this.setState({
				...this.state,
				genres: genres
			})
		}).catch((error) => {
			console.log(`get genres (categories) failed`)
		})
	}
	getAuthors = async () => {
		const token = sessionStorage.getItem('token') || localStorage.getItem('token');
		await Axios({
			method: 'GET',
			url: `${apiUri.authors.getAllAuthors}`,
			headers: {
				authorization: token
			}
		}).then((res) => {
			// console.log(res);
			const authors = res.data.data;
			this.setState({
				...this.state,
				authors: authors
			})
		}).catch((error) => {
			console.log(`get authors failed`)
		})
	}
	updateBook = async (event) => {
		event.preventDefault();
		const token = sessionStorage.getItem('token') || localStorage.getItem('token');
		const formData = new FormData(event.target);
		const param = this.state.book.book_id;
		if (formData.get('title') === this.state.book.title) {
			formData.delete('title');
		}

		await Axios({
			method: 'PATCH',
			url: `${apiUri.books.patchBook}/${param}`,
			data: formData,
			headers: {
				'Content-Type': 'multipart/form-data',
				'authorization': token
			}
		}).then((res) => {
			if (res.status === 200) {
				this.getDetailBooks();
				Swal.fire(
					'Update Book Success!',
					'book updated successfully.',
					'success'
				).then(() => {
					$(document).find('#editBookModal').click()
				})
			}
		}).catch((error) => {
			console.log(error.response.data);
			error.response.data.message
				? Swal.fire(
					'Update Book Failed!',
					`${error.response.data.message}`,
					'error'
				)
				: Swal.fire(
					'Update Book Failed!',
					'Please try again',
					'error'
				)
		})
	}
	deleteBook = async () => {
		const token = sessionStorage.getItem('token') || localStorage.getItem('token');
		const param = this.state.book.book_id;
		Swal.fire({
			title: 'Are you sure?',
			text: "You won't be able to revert this!",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes, delete it!'
		}).then(async (result) => {
			if (result.value) {
				await Axios({
					method: 'DELETE',
					url: `${apiUri.books.deleteBook}/${param}`,
					headers: {
						'authorization': token
					}
				}).then((res) => {
					if (res.status === 200) {
						Swal.fire(
							'Delete Book Success!',
							'book deleted successfully.',
							'success'
						).then(() => {
							this.props.history.push('/home');
						})
					}
				}).catch((error) => {
					console.log(error.response.data);
					error.response.data.message
						? Swal.fire(
							'Delete Book Failed!',
							`${error.response.data.message}`,
							'error'
						)
						: Swal.fire(
							'Delete Book Failed!',
							'Please try again',
							'error'
						)
				})
			}
		})
	}
	checkBorrowedBook = async () => {
		const token = sessionStorage.getItem('token') || localStorage.getItem('token');
		const userData = jwtDecode(token);
		const bookId = this.state.book.book_id;
		const userId = userData.user_id;
		await Axios({
			method: 'GET',
			url: `${apiUri.histories.getPendingHistories}/${bookId}/${userId}`,
			headers: {
				authorization: token
			}
		}).then((res) => {
			// console.log(res);
			const pendingHistories = res.data.data;
			this.setState({
				...this.state,
				pendingHistories: pendingHistories
			})
		}).catch((error) => {
			// console.log(error)
			console.log(`get pendingHistories failed`)
		})
	}
	borrowBook = async () => {
		const token = sessionStorage.getItem('token') || localStorage.getItem('token');
		const param = this.state.book.book_id;
		await Axios({
			method: 'PATCH',
			url: `${apiUri.books.borrowBook}/${param}/borrow`,
			headers: {
				'authorization': token
			}
		}).then((res) => {
			if (res.status === 200) {
				this.getDetailBooks();
				this.checkBorrowedBook();
				Swal.fire(
					'Borrow Book Success!',
					'book borrowed successfully.',
					'success'
				)
			}
		}).catch((error) => {
			// console.log(error.response.data);
			error.response.data.message
				? Swal.fire(
					'Borrow Book Failed!',
					`${error.response.data.message}`,
					'error'
				)
				: Swal.fire(
					'Borrow Book Failed!',
					'Please try again',
					'error'
				)
		})
	}
	returnBook = async () => {
		const token = sessionStorage.getItem('token') || localStorage.getItem('token');
		const param = this.state.book.book_id;
		await Axios({
			method: 'PATCH',
			url: `${apiUri.books.returnBook}/${param}/return`,
			headers: {
				'authorization': token
			}
		}).then((res) => {
			if (res.status === 200) {
				this.getDetailBooks();
				this.checkBorrowedBook();
				Swal.fire(
					'Return Book Success!',
					'book returned successfully.',
					'success'
				)
			}
		}).catch((error) => {
			// console.log(error.response.data);
			error.response.data.message
				? Swal.fire(
					'Return Book Failed!',
					`${error.response.data.message}`,
					'error'
				)
				: Swal.fire(
					'Return Book Failed!',
					'Please try again',
					'error'
				)
		})
	}

	render() {
		const modalBody = <div>
			<Form onSubmit={this.updateBook} id="formEdit">
				<FormGroup>
					<Label for="">Title</Label>
					<Input type="text" name="title" id="title" placeholder="title here" defaultValue={this.state.book.title} required />
				</FormGroup>
				<FormGroup>
					<Label for="l">Image</Label>
					<Input type="file" name="image" id="" />
				</FormGroup>
				<FormGroup>
					<Label for="">Author</Label>
					<Input type="select" name="author_id" id="author_id" defaultValue={this.state.book.author_id} required>
						{this.state.authors.map(author => {
							return (
								<option key={author.author_id} value={author.author_id}>{author.name}</option>
							)
						})}
					</Input>
				</FormGroup>
				<FormGroup>
					<Label for="">Genre</Label>
					<Input type="select" name="genre_id" id="genre_id" defaultValue={this.state.book.genre_id} required>
						{this.state.genres.map(genre => {
							return (
								<option key={genre.genre_id} value={genre.genre_id}>{genre.name}</option>
							)
						})}
					</Input>
				</FormGroup>
				<FormGroup>
					<Label for="">Status</Label>
					<Input type="select" name="status" id="status" defaultValue={this.state.book.status} required>
						<option value="0">Available</option>
						<option value="1">Not Available</option>
					</Input>
				</FormGroup>
				<FormGroup>
					<Label for="">Quantity</Label>
					<Input type="number" name="quantity" id="quantity" placeholder="quantity" min="1" pattern="[0-9]" defaultValue={this.state.book.quantity} required />
				</FormGroup>
				<FormGroup>
					<Label for="">Description</Label>
					<MdTextarea
						name="description"
						id="description"
						rows={10}
						onChange={(e) => this.onChange('mdTxt', e.target.value)}
						value={this.state.mdTxt}
						allowFilteredHtml={true}
						min="50"
						required
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
						<MyModal id="editBookModal" modalTitle="Edit Data" modalBody={modalBody} size="lg" />
						<Nav>
							<Link to="#" onClick={() => { $('#editBookModal').click(); }} style={{ display: this.state.user.role > 2 && 'none' }}>Edit</Link>
							<Link to="#" onClick={() => { this.deleteBook() }} style={{ display: this.state.user.role > 1 && 'none' }}>Delete</Link>
						</Nav>
					</div>
				</div>
				{/* Jumbotron */}
				<Row>
					<Col className={style.headline}>
						<Jumbotron fluid className={style.jumbotron} style={{ background: `url(${this.state.book.image})` }}>
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
								<span>{this.state.book.genre_name}</span>
								<h1>{this.state.book.title}</h1>
								<small>{this.convertDate(this.state.book.added)}</small>
							</Col>
							{/* status */}
							<Col md="3" sm="3" className={style.status}>
								<p style={{ color: this.state.book.status === 1 && `red` }}>{this.state.book.status === 0 ? `Available` : `Not Available`}</p>
							</Col>
						</Row>
						<Row>
							{/* Text */}
							<Col className={style.text}>
								{this.state.book.description}
							</Col>
						</Row>
					</Col>
					{/* Borrow */}
					<Col md="3" className={style.borrow} >
						<Row>
							<div className={style.image} style={{ background: `url(${this.state.book.image})` }}></div>
						</Row>
						<Row>
							<div className={style.buttonWrapper} style={{ display: this.state.book.status === 0 ? `block` : `none` }}>
								<Button size="lg" className={style.button} style={{ display: this.state.pendingHistories.length > 0 && `none` }} onClick={this.borrowBook}>Borrow</Button>
								<Button size="lg" className={style.buttonReturn} style={{ display: this.state.pendingHistories.length > 0 && `block` }} onClick={this.returnBook}>Return</Button>
							</div>
						</Row>
					</Col>
				</Row>
			</Container>
		)
	}
}
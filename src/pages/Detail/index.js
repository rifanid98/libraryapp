// library
import React, { Component } from 'react'
import Axios from 'axios';
import { connect } from 'react-redux';

// third party component
import {
	Container, Col, Row, Button,
	Jumbotron
} from 'reactstrap';
import Swal from 'sweetalert2';

// custom config
import { apiUri } from 'configs';
import { decodeJwtToken, convertDate } from 'utils';
import { getBooks, getAuthors, getCategories, patchBook, borrowBook, returnBook } from 'modules';

// style
import style from './detail.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

class Detail extends Component {
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
	// functions are not connected to database
	// MdTextarea
	onChange = (stateName, value) => {
		this.setState({ ...this.state, [stateName]: value })
	}
	checkAuth = () => {
		const token = sessionStorage.getItem('token') || localStorage.getItem('token') || this.props.auth.data.tokenLogin;
		if (!token) {
			this.props.history.push('/login');
		} else if (token !== "undefined") {
			const userData = decodeJwtToken(token);
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

	// functions are connected to database
	getDetailBooks = async () => {
		const token = sessionStorage.getItem('token') || localStorage.getItem('token');
		const book_id = this.state.book.book_id;
		this.props.getBooks(token, book_id)
			.then((res) => {
				const book = this.props.books.data;
				this.setState({
					...this.state,
					book: book[0],
					mdTxt: book[0].description
				})
			}).catch((error) => {
				console.log(error, 'get detail book')
				console.log(`get books failed`)
			})
	}
	getCategories = async () => {
		const token = sessionStorage.getItem('token') || localStorage.getItem('token') || this.state.auth.token;
		if (token) {
			this.props.getCategories(token)
				.then((res) => {
					const genres = this.props.genres.data;
					this.setState({
						...this.state,
						genres: genres
					})
				}).catch((error) => {
					console.log(`get genres (categories) failed`)
				})
		}
	}
	getAuthors = async () => {
		const token = sessionStorage.getItem('token') || localStorage.getItem('token') || this.state.auth.token;
		if (token) {
			this.props.getAuthors(token)
				.then((res) => {
					const authors = this.props.authors.data;
					this.setState({
						...this.state,
						authors: authors
					})
				}).catch((error) => {
					console.log(`get authors failed`)
				})
		}
	}
	checkBorrowedBook = async () => {
		const token = sessionStorage.getItem('token') || localStorage.getItem('token');
		const userData = decodeJwtToken(token);
		const bookId = this.state.book.book_id;
		const userId = userData.user_id;
		await Axios({
			method: 'GET',
			// url: `${apiUri.histories.getPendingHistories}/all/${userId}`,
			url: `${apiUri.histories}/${bookId}/${userId}`,
			headers: {
				authorization: token
			}
		}).then((res) => {
			console.log(res);
			const pendingHistories = res.data.data;
			this.setState({
				...this.state,
				pendingHistories: pendingHistories
			})
		}).catch((error) => {
			console.log(error)
			console.log(`get pendingHistories failed`)
		})
	}
	borrowBook = async () => {
		const token = sessionStorage.getItem('token') || localStorage.getItem('token') || this.props.auth.data;
		const id = this.state.book.book_id;
		this.props.borrowBook(token, id)
			.then((res) => {
				if (res.value.status === 200) {
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
		const token = sessionStorage.getItem('token') || localStorage.getItem('token') || this.props.auth.data;
		const id = this.state.book.book_id;
		this.props.returnBook(token, id)
			.then((res) => {
				if (res.value.status === 200) {
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
		return (
			<Container fluid className={style.container}>
				{/* navbar tools */}
				<div className={style.navbarTools}>
					{/* back button */}
					<div className={style.backButton} onClick={() => { this.props.history.push('/home') }}>
						<FontAwesomeIcon icon={faArrowLeft} className={style.backButtonIcon} />
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
								<small>{convertDate(this.state.book.added)}</small>
							</Col>
							{/* status */}
							<Col md="3" sm="3" className={style.status}>
								<p style={{ color: this.state.book.status === 1 && `red` }}>{this.state.book.status === 0 ? `${this.state.book.quantity} Books Available` : `Not Available`}</p>
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

const mapStateToProps = (state) => ({
	auth: state.auth,
	books: state.books,
	authors: state.authors,
	genres: state.genres
})

const mapDispathToProps = {
	getBooks,
	getCategories,
	getAuthors,
	patchBook,
	borrowBook,
	returnBook
}

export default connect(mapStateToProps, mapDispathToProps)(Detail)
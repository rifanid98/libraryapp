import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { Container, Col, Row, FormGroup, Label, Input } from 'reactstrap';
import { Button, Form,  } from 'reactstrap';
import style from './signup.module.css';

export default class Signup extends Component {
	constructor(props) {
		document.title = `Signup`;
		super(props)
	}

  render() {
	return (
		<Container fluid className={style.container}>
			<Row>
			{/* Content */}
				<Col className={style.content} md="8">
					<Row>
						<Col md="2"></Col>
						<Col className={style.caption} md="8">
							<div className={style.title}>
								<p>Book is a window</p>
								<p>to the world</p>
							</div>
						</Col>
						<Col md="2"></Col>
					</Row>
					<Row>
						<Col md="2"></Col>
						<Col className={style.caption} md="8">
							<div className={style.captionQuote}>
								<p>
									"Semakin aku banyak membaca, semakin aku banyak berpikir; semakin aku banyak belajar, semakin aku sadar bahwa aku tak mengetahui apa pun."</p>
								<p>
									Voltaire <br />
									<small>Penulis dan filsuf dari Perancis</small>
								</p>
							</div>
						</Col>
						<Col md="2"></Col>
					</Row>
					<Row className={style.contentFooter}>
						<Col md="2"></Col>
						<Col md="8">
							<p>Photo by <a href="https://unsplash.com/@itfeelslikefilm?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Janko Ferlič</a> on <a href="/?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a></p>
						</Col>
						<Col md="2"></Col>
					</Row>
				</Col>
			{/* Sidebar */}
				<Col className={style.sidebar} md="4">
					<Row>
						<Col md="12">
							<Row className={style.sidebarHeader}>
								<p>Sign Up</p>
								<small>Welcome back! Please register to create your account.</small>
							</Row>
							<Row className={style.sidebarContent}>
								<Form action="#" className={style.form}>
									<FormGroup>
										<Label className={style.label} for="username">Username</Label>
										<Input type="text" name="username" id="username" placeholder="username" />
									</FormGroup>
									<FormGroup>
										<Label className={style.label} for="full_name">Full Name</Label>
										<Input type="text" name="full_name" id="full_name" placeholder="full name" />
									</FormGroup>
									<FormGroup>
										<Label className={style.label} for="email">Email Address</Label>
										<Input type="email" name="email" id="email" placeholder="example@domain.com" />
									</FormGroup>
									<FormGroup>
										<Label className={style.label} for="password">Password</Label>
										<Input type="password" name="password" id="password" placeholder="password" />
									</FormGroup>
									<Button className={style.buttonLogin}>Sign Up</Button>
									<Button className={style.buttonSignup} outline onClick={(event) => { event.preventDefault(); this.props.history.push('/login') }}>Login</Button>
								</Form>
							</Row>
							<Row className={style.sidebarFooter}>
								<p>By signing up, you agree to Book's <Link to="/">Terms and Conditions</Link> & <Link to="/">Privacy Policy</Link></p>
							</Row>
						</Col>
					</Row>
				</Col>
			</Row>
		</Container>
	 )
  }
}
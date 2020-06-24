import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { Container, Col, Row, FormGroup, Label, Input } from 'reactstrap';
import { Button, Form,  } from 'reactstrap';
import style from './login.module.css';

export default class Login extends Component {
	constructor(props) {
		document.title = `Login`;
		super(props)
	}

  render() {
	return (
		<Container fluid className={style.container}>
			<Row>
				<Col className={style.content} md="8">
					<Row>
						<Col className={style.caption}>
							<div className={style.title}>
								<p>Book is a window</p>
								<p>to the world</p>
							</div>
						</Col>
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
						<span>Photo by <a href="https://unsplash.com/@itfeelslikefilm?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Janko Ferlič</a> on <a href="/?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a></span>
					</Row>
				</Col>
				<Col className={style.sidebar} md="4">
					<Row className={style.sidebarHeader}>
						<p>Login
						</p>
							<small>Welcome back! Please login to your account.</small>
					</Row>
					<Row className={style.sidebarContent}>
						<Form action="#">
							<FormGroup>
								<Label for="email">Email Address</Label>
								<Input type="email" name="email" id="email" placeholder="example@domain.com" />
							</FormGroup>
							<FormGroup>
								<Label for="password">Password</Label>
								<Input type="password" name="password" id="password" placeholder="password" />
							</FormGroup>
							<FormGroup check>
								<Label check>
									<Input type="checkbox" />{' '}
									<span style={{float: 'left', position: 'absolute', left: '17px'}}>Remember Me</span>
									<span style={{ float: 'right', position: 'absolute', right: '0px' }}><Link to="/">Forgot Password</Link></span>
								</Label>
							</FormGroup>
							<Button className={style.buttonLogin}>Login</Button>
							<Button className={style.buttonSignup} outline onClick={(event) => {event.preventDefault(); this.props.history.push('/signup')}}>Signup</Button>
						</Form>
					</Row>
					<Row className={style.sidebarFooter}>
						<Col md={{ size: 8, offset: 2 }}>
							<span>
								
								<p>By signing up, you agree to Book's <Link to="/">Terms and Conditions</Link> & <Link to="/">Privacy Policy</Link></p>
							</span>
					</Col>
					</Row>
				</Col>
			</Row>
		</Container>
	 )
  }
}
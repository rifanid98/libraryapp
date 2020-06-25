import React, { Component } from 'react'
// import { Link } from 'react-router-dom';

import { Container, Col, Row, 
	
	// FormGroup, Label, Input, 
	
	Button, 
	
	// Form, 
	
	Jumbotron } from 'reactstrap';

import style from './detail.module.css';

export default class Detail extends Component {
	constructor(props) {
		document.title = `Detail`;
		super(props)
	}

  render() {
	return (
		<Container fluid className={style.container}>
			<div>
				{/* navbar tools */}
				
			</div>
			{/* Jumbotron */}
			<Row>
				<Col className={style.headline}>
					<Jumbotron fluid className={style.jumbotron} style={{ background: 'url(https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-1.2.1&auto=format&fit=crop&w=1441&q=80)'}}>
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
						<div className={style.image} style={{ background: 'url(https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-1.2.1&auto=format&fit=crop&w=1441&q=80)'}}></div>
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
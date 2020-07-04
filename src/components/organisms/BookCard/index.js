// library
import React from 'react'

// third party component
import {
	Col,
	Card,
	CardBody,
	CardTitle,
	CardText
} from 'reactstrap';

// custom style
import style from './style.module.css';

const BookCard = (props) => {
	const {
		history,
		bookId,
		cardImage,
		cardTitle,
		cardText,
		cardFooter
	} = props;

	return (
		<Col md="4" sm="6" xs="12" onClick={() => { history.push(`/detail/${bookId}`) }}>
			<Card className={style.card} style={{ backgroundImage: `url(${cardImage})` }}>
				<div className={style.imgWrapper}></div>
				<CardBody className={style.cardBody}>
					<CardTitle className={style.cardTitle}>{cardTitle}</CardTitle>
					<CardText className={style.cardText}>{cardText} <br /> {cardFooter}</CardText>
				</CardBody>
			</Card>
		</Col>
	)
}

export default BookCard;
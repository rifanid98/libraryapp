// library
import React from 'react'
import { Link } from 'react-router-dom';

// custom style
import style from './style.module.css';

const SliderItem = (props) => {
  const {
    slideImage,
    id
  } = props;

  return (
    <Link to={`/detail/${id}`}>
      <div className={`${style.slide}`}>
        <div className={`${style.slideItem}`} style={{ backgroundImage: `url(${slideImage})` }}>
        </div>
      </div>
    </Link>
  )
}

export default SliderItem;
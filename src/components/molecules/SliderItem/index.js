// library
import React from 'react'
import { Link } from 'react-router-dom';

// custom style
import style from './style.module.css';
import { appConfig } from 'configs';

const SliderItem = (props) => {
  const {
    slideImage,
    id
  } = props;

  return (
    <Link to={`/detail/${id}`}>
      <div className={`${style.slide}`}>
        <div className={`${style.slideItem}`} style={{ backgroundImage: `url(${appConfig.url.assets}/${slideImage})` }}>
        </div>
      </div>
    </Link>
  )
}

export default SliderItem;
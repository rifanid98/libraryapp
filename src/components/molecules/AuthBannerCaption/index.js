// libray
import React from 'react'

// custom style
import style from './style.module.css';

const AuthBannerCaption = (props) => {
  const {
    text,
    figure,
    aboutFigure,
  } = props;

  return (
    <div className={style.captionQuote}>
      <p>{`"${text}."`}</p>
      <p>
        {figure} <br />
        <small>{aboutFigure}</small>
      </p>
    </div>
  )
}

export default AuthBannerCaption;
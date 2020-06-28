// library
import React from 'react';

// custom style
import style from './style.module.css';

const AuthBannerTitle = (props) => {
    const {
        text
    } = props;
    return (
        <div className={style.title}>
            <p>{text}</p>
            {/* <p>to the world</p> */}
        </div>
    )
}

export default AuthBannerTitle;
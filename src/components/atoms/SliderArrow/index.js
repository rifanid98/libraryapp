// library
import React from 'react'

const SliderArrow = (props) => {
    const {
        className,
        style,
        onClick
    } = props;

    return (
        <div
            className={className}
            style={{ ...style, display: "block", background: "#e4ba33", borderRadius: '100px' }}
            onClick={onClick}
        />
    );
}

export default SliderArrow;
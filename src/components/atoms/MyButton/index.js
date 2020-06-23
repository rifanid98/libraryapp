import { React, PropTypes } from "libraries";

const MyButton = ({ title }) => {
  const style = {
    margin: '5px'
  }
  
  return (
    <button style={style}>{title}</button>
  )   
};

MyButton.propTypes = {
  title: PropTypes.string
};

MyButton.defaultProps = {
  title: "button"
};

export default MyButton;
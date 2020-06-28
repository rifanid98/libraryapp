// libraru
import React from 'react'
import { Link } from 'react-router-dom';

const AuthSidebarFooter = (props) => {
  const {
    byText
  } = props;

  return (
    <p>
      By {byText}, you agree to Book's&nbsp;
      <Link to="/">Terms and Conditions</Link> & <Link to="/">Privacy Policy</Link>
    </p>
  )
}

export default AuthSidebarFooter;
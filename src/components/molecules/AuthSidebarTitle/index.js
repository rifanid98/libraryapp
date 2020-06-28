// library
import React from 'react'

const AuthSidebarTitle = (props) => {
  const {
    text,
    description
  } = props;

  return (
    <>
      <p>{text}</p>
      <small>{description}.</small>
    </>
  )
}

export default AuthSidebarTitle;
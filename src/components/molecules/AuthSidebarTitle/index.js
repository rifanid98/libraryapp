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
      <a style={{fontSize: 15}} href="https://drive.google.com/file/d/1aiLuEH8av7U1BnmwylLmGMQurPzW8u_n/view?usp=sharing">Download Al Maktabah Mobile.</a>
    </>
  )
}

export default AuthSidebarTitle;
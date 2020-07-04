import React, { Component } from 'react'

export default class Logout extends Component {
  componentDidMount() {
    this.setState({
      empty: ''
    })
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    localStorage.clear();
    sessionStorage.clear();
    this.props.history.push('/login');
  }

  render() {
    return (
      <>
        <p>Loging Out...</p>
      </>
    )
  }
}

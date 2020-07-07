import React, { Component } from 'react'
import { logout } from 'modules';
import { connect } from 'react-redux';

class Logout extends Component {
  constructor(props) {
    super(props)
    this.setState({
      empty: ''
    })
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    localStorage.clear();
    sessionStorage.clear();
  }
  componentDidMount() {
    this.props.logout()
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

const mapStateToProps = state => {

}

const mapDispatchToProps = {
  logout
}

export default connect(mapStateToProps, mapDispatchToProps)(Logout)
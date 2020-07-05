// library
import React, { Component } from 'react'
import { Link } from 'react-router-dom';

// third party component
import {
  Container,
  Col,
  Row,

  FormGroup,
  Label,
  Input,
  Button,
  Form,
  Spinner
} from 'reactstrap';
import Swal from 'sweetalert2';

// custom component
import {
  AuthBannerTitle,
  AuthBannerCaption,
  AuthSidebarTitle,
  AuthSidebarFooter
} from 'components';

// custom style
import style from './login.module.css';
import { connect } from 'react-redux';
import { login } from 'modules';

class Login extends Component {
  constructor(props) {
    document.title = `Login`;
    super(props)
  }

  // handleSubmit = async (event) => {
  handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    let rememberMe = 'off';
    if (formData.get('remember_me') === 'on') {
      rememberMe = 'on';
      formData.delete('remember_me');
    }
    this.props.login(formData)
      .then(res => {
        if ('status' in res.value && parseInt(res.value.status) === 200) {
          const token = this.props.auth.data.tokenLogin;
          if (rememberMe === 'on') {
            localStorage.setItem('token', token)
          } else {
            sessionStorage.setItem('token', token)
          }
          this.props.history.push('/home')
        } else {
          Swal.fire(
            'Login Failed!',
            'Pleas try again',
            'error'
          );
        }
      })
      .catch(error => {
        if (error.response !== undefined) {
          if (error.response.data) {
            console.log(error.response.data);
          }
        }
        Swal.fire(
          'Login Failed!',
          'Pleas try again',
          'error'
        );
      });
  }

  render() {
    return (
      <Container fluid className={style.container}>
        <Row>
          {/* Auth Banner */}
          <Col className={style.content} md="8">
            <Row>
              <Col md="2"></Col>
              <Col className={style.title} md="8">
                <AuthBannerTitle text="Book is a window to the world" />
              </Col>
              <Col md="2"></Col>
            </Row>
            <Row>
              <Col md="2"></Col>
              <Col className={style.caption} md="8">
                <AuthBannerCaption
                  text="Semakin aku banyak membaca, semakin aku banyak berpikir; semakin aku banyak belajar, semakin aku sadar bahwa aku tak mengetahui apa pun"
                  figure="Voltaire"
                  aboutFigure="Penulis dan filsuf dari Perancis"
                />
              </Col>
              <Col md="2"></Col>
            </Row>
            <Row className={style.contentFooter}>
              <Col md="2"></Col>
              <Col md="8">
                <p>Photo by <a href="https://unsplash.com/@itfeelslikefilm?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Janko Ferlič</a> on <a href="/?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a></p>
              </Col>
              <Col md="2"></Col>
            </Row>
          </Col>
          <Col className={style.sidebar} md="4">
            <Row>
              <Col md="12">
                <Row className={style.sidebarHeader}>
                  <AuthSidebarTitle text="Login" description="Welcome back! Please login to your account" />
                </Row>
                <Row className={style.sidebarContent}>
                  {/* sidebar content componenty */}
                  <Form className={style.form} onSubmit={this.handleSubmit}>
                    <FormGroup>
                      <Label className={style.label} for="email">Email Address</Label>
                      <Input type="text" name="username" id="username" placeholder="username or email" />
                    </FormGroup>
                    <FormGroup>
                      <Label className={style.label} for="password">Password</Label>
                      <Input type="password" name="password" id="password" placeholder="password" />
                    </FormGroup>
                    <FormGroup check>
                      <Label className={style.label} check>
                        <Input type="checkbox" name="remember_me" />{' '}
                        <span className={style.span} style={{ float: 'left', position: 'absolute', left: '17px' }}>Remember Me</span>
                        <span className={style.span} style={{ float: 'right', position: 'absolute', right: '0px' }}><Link to="/">Forgot Password</Link></span>
                      </Label>
                    </FormGroup>
                    <Button className={style.buttonLogin}>  <Spinner className="" color="light" style={{ width: '10px', height: '10px', display: this.props.auth.isLoading ? 'inline-block' : 'none' }} /> Login</Button>
                    <Button className={style.buttonSignup} outline onClick={(event) => { event.preventDefault(); this.props.history.push('/signup') }}>Sign Up</Button>
                  </Form>
                </Row>
                <Row className={style.sidebarFooter}>
                  <AuthSidebarFooter byText="signing up" />
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    )

  }
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

const mapDispatchToProps = { login }

export default connect(mapStateToProps, mapDispatchToProps)(Login);
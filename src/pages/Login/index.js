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
  Form
} from 'reactstrap';

// custom component
import {
  AuthBannerTitle,
  AuthBannerCaption,
  AuthSidebarTitle,
  AuthSidebarFooter
} from 'components';

// custom style
import style from './login.module.css';

export default class Login extends Component {
  constructor(props) {
    document.title = `Login`;
    super(props)
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
                  <Form action="#" className={style.form}>
                    <FormGroup>
                      <Label className={style.label} for="email">Email Address</Label>
                      <Input type="email" name="email" id="email" placeholder="example@domain.com" />
                    </FormGroup>
                    <FormGroup>
                      <Label className={style.label} for="password">Password</Label>
                      <Input type="password" name="password" id="password" placeholder="password" />
                    </FormGroup>
                    <FormGroup check>
                      <Label className={style.label} check>
                        <Input type="checkbox" />{' '}
                        <span className={style.span} style={{ float: 'left', position: 'absolute', left: '17px' }}>Remember Me</span>
                        <span className={style.span} style={{ float: 'right', position: 'absolute', right: '0px' }}><Link to="/">Forgot Password</Link></span>
                      </Label>
                    </FormGroup>
                    <Button className={style.buttonLogin} onClick={(event) => { event.preventDefault(); this.props.history.push('/home') }}>Login</Button>
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
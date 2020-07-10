// library
import React, { Component } from 'react'
import { connect } from 'react-redux';
import { register } from 'modules';

// third party component
import {
  Container,
  Col,
  Row,

  Form,
  FormGroup,
  Label,
  Input,
  Button
} from 'reactstrap';

// custom component
import {
  AuthBannerTitle,
  AuthBannerCaption,
  AuthSidebarTitle,
  AuthSidebarFooter
} from 'components';
import Swal from 'sweetalert2';

// custom style
import style from './signup.module.css';


class Signup extends Component {
  constructor(props) {
    document.title = `Signup`;
    super(props)
  }
  handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    formData.append('role', 3)
    this.props.register(formData)
      .then((res) => {
        if (res.value.status === 201) {
          Swal.fire(
            'Sign Up success!',
            'Account created. Please login to continoue',
            'success'
          ).then(() => {
            this.props.history.push('/login');
          })
        }
      }).catch((error) => {
        if (error.response.data) {
          Swal.fire(
            'Sign Up Failed!',
            `${error.response.data.message}`,
            'error'
          )
        } else {
          Swal.fire(
            'Sign Up Failed!',
            'Please try again',
            'error'
          )
        }
      })
  }
  render() {
    return (
      <Container fluid className={style.container}>
        <Row>
          {/* Content */}
          <Col className={style.content} md="8">
            <Row>
              <Col md="2"></Col>
              <Col className={style.caption} md="8">
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
          {/* Sidebar */}
          <Col className={style.sidebar} md="4">
            <Row>
              <Col md="12">
                <Row className={style.sidebarHeader}>
                  <AuthSidebarTitle text="Sign Up" description="Welcome back! Please register to create your account" />
                </Row>
                <Row className={style.sidebarContent}>
                  <Form action="#" className={style.form} onSubmit={this.handleSubmit}>
                    <FormGroup>
                      <Label className={style.label} for="username">Username</Label>
                      <Input type="text" name="username" id="username" placeholder="username" required />
                    </FormGroup>
                    <FormGroup>
                      <Label className={style.label} for="full_name">Full Name</Label>
                      <Input type="text" name="full_name" id="full_name" placeholder="full name" required />
                    </FormGroup>
                    <FormGroup>
                      <Label className={style.label} for="email">Email Address</Label>
                      <Input type="email" name="email" id="email" placeholder="example@domain.com" required />
                    </FormGroup>
                    <FormGroup>
                      <Label className={style.label} for="password">Password</Label>
                      <Input type="password" name="password" id="password" placeholder="password" required />
                    </FormGroup>
                    <Button className={style.buttonLogin}>Sign Up</Button>
                    <Button className={style.buttonSignup} outline onClick={(event) => { event.preventDefault(); this.props.history.push('/login') }}>Login</Button>
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

})

const mapDispatchToProps = {
  register
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup)
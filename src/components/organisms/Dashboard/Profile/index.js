import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { Form, FormGroup, Label, Input, Button, Col, Row } from 'reactstrap';
import { patchUser, getDetailUser } from 'modules';
import Swal from 'sweetalert2';

const Profile = (props) => {
  const [auth] = useState(props.auth.data)
  const [user, setUser] = useState(props.users.data[0])
  const [image, setImage] = useState(user.image)

  // props didmount
  useEffect(() => {
    props.getDetailUser(auth.tokenLogin, auth.user_id)
  }, [])

  // props diupdate
  useEffect(() => {
    setUser(props.users.data[0]);
    setImage(props.users.data[0].image);
  }, [props])

  // image didupdate
  // if setNewImageProfile put in props didupdate will casusing infinite loop
  useEffect(() => {
    props.setNewImageProfile(image);
  }, [image])

  const getLastData = () => {
    props.getDetailUser(auth.tokenLogin, auth.user_id)
  }

  const updateUser = (event) => {
    event.preventDefault();
    console.log(user, 'ini user')
    const token = auth.tokenLogin;
    const user_id = user.user_id;
    const formData = new FormData(event.target);
    formData.get('username') === user.username && formData.delete('username');
    formData.get('full_name') === user.full_name && formData.delete('full_name');
    formData.get('email') === user.email && formData.delete('email');
    formData.get('password') === '' && formData.delete('password');
    formData.get('image').size === 0 && formData.delete('image');

    let values = [];
    for (let value of formData.values()) {
      values.push(value);
    }

    if (values.length > 0) {
      props.patchUser(token, formData, user_id)
        .then((res) => {
          if (res.value.status === 200) {
            Swal.fire(
              'Update Profile Success!',
              'profile updated successfully.',
              'success'
            ).then(() => {
              getLastData();
            })
          }
        }).catch((error) => {
          console.log(error);
          error.response.data.message
            ? Swal.fire(
              'Update Profile Failed!',
              `${error.response.data.message}`,
              'error'
            )
            : Swal.fire(
              'Update Profile Failed!',
              'Please try again',
              'error'
            )
        })
    } else {
      Swal.fire(
        'Nothing is changed!',
        `You don't change anything`,
        ''
      )
    }
  }
  return (
    <>
      <Col md="12">
        <Form onSubmit={(e) => updateUser(e)}>
          <Row form>
            <Col md="6">
              <FormGroup>
                <Label for="">Username</Label>
                <Input type="text" name="username" id="" placeholder="username" defaultValue={auth.username} required />
              </FormGroup>
            </Col>
            <Col md="6">
              <FormGroup>
                <Label for="">Full Name</Label>
                <Input type="text" name="full_name" id="" placeholder="full name" defaultValue={auth.full_name} required />
              </FormGroup>
            </Col>
          </Row>
          <Row form>
            <Col md="6">
              <FormGroup>
                <Label for="">Email</Label>
                <Input type="email" name="email" id="" placeholder="example@company.com" defaultValue={auth.email} required />
              </FormGroup>
            </Col>
            <Col md="6">
              <FormGroup>
                <Label for="">Password</Label>
                <Input type="password" name="password" id="" placeholder="password" />
              </FormGroup>
            </Col>
          </Row>
          <FormGroup>
            <Label for="">Image</Label>
            <Input type="file" name="image" id="" />
          </FormGroup>
          <Button color="warning">Save</Button>
        </Form>
      </Col>
    </>
  )
}
const mapStateToProps = (state) => ({
  auth: state.auth,
  users: state.users
})

const mapDispathToProps = {
  patchUser,
  getDetailUser,
}
export default connect(mapStateToProps, mapDispathToProps)(Profile)
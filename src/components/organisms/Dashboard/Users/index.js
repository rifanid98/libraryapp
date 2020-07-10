import React, { useState, useEffect } from 'react'
import { MyTable } from 'components/';
import { connect } from 'react-redux';
import { MyModal } from 'components';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import $ from 'jquery';
import { addUser, deleteUser, patchUser, getUsers } from 'modules';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';

const Users = (props) => {
  const [auth] = useState(props.auth.data)
  const [data, setData] = useState({
    users: props.users.data
  })
  const [user, setUser] = useState({
    user_id: 0,
    username: '',
    full_name: '',
    email: '',
    role: 0
  })
  const tableHead = [
    { title: 'Image' },
    { title: 'Username' },
    { title: 'Full Name' },
    { title: 'Email' },
    { title: 'Role' },
    { title: 'Action' }
  ]
  const tableBody = <>
    {
      data.users.map((user, index) => {
        return (
          <tr>
            <th scope="row">{index + 1}</th>
            <td>
              <img src={user.image} width="70" alt="" />
            </td>
            <td>{user.username}</td>
            <td>{user.full_name}</td>
            <td>{user.email}</td>
            <td>{user.role > 1 ? user.role > 2 ? `User` : `Staff` : `Admin`}</td>
            <td className="">
              <div class="btn-group" role="group" aria-label="Basic example">
                <Button color="warning
              " style={{
                    width: '50px',
                    padding: '0px '
                  }} onClick={() => { editUser(user.user_id) }}>
                  <FontAwesomeIcon icon={faEdit} />
                </Button>
                <Button color="danger" style={{
                  width: '50px',
                  padding: '0px ',
                  display: `${auth.role > 1 ? 'none' : 'inline-item'}`
                }}
                  onClick={() => { deleteUser(user.user_id) }}>
                  <FontAwesomeIcon icon={faTrashAlt} />
                </Button>
              </div>
            </td>
          </tr>
        )
      })
    }
  </>
  const addModalBody = <div>
    <Form onSubmit={(e) => addUser(e)}>
      <FormGroup>
        <Label for="">Image</Label>
        <Input type="file" name="image" />
      </FormGroup>
      <FormGroup>
        <Label for="">Username</Label>
        <Input type="text" name="username" placeholder="username" required />
      </FormGroup>
      <FormGroup>
        <Label for="">Full Name</Label>
        <Input type="text" name="full_name" placeholder="full name" required />
      </FormGroup>
      <FormGroup>
        <Label for="">Email</Label>
        <Input type="email" name="email" placeholder="example@email.com" required />
      </FormGroup>
      <FormGroup>
        <Label for="">Role</Label>
        <Input type="select" name="role" required>
          <option key="0" value="3">User</option>
          <option key="1" value="2">Staff</option>
          <option key="2" value="1">Admin</option>
        </Input>
      </FormGroup>
      <Button color="warning" className="float-right">Save</Button>
    </Form>
  </div>
  const editModalBody = <div>
    <Form onSubmit={(e) => updateUser(e)}>
      <FormGroup>
        <Label for="">Image</Label>
        <Input type="file" name="image" />
      </FormGroup>
      <FormGroup>
        <Label for="">Username</Label>
        <Input type="text" name="username" placeholder="username" defaultValue={user.username} required />
      </FormGroup>
      <FormGroup>
        <Label for="">Full Name</Label>
        <Input type="text" name="full_name" placeholder="full name" defaultValue={user.full_name} required />
      </FormGroup>
      <FormGroup>
        <Label for="">Email</Label>
        <Input type="email" name="email" placeholder="example@email.com" defaultValue={user.email} required />
      </FormGroup>
      <FormGroup>
        <Label for="">Role</Label>
        <Input type="select" name="role" defaultValue={user.role} required>
          <option key="0" value="3">User</option>
          <option key="1" value="2">Staff</option>
          <option key="2" value="1">Admin</option>
        </Input>
      </FormGroup>
      <Button color="warning" className="float-right">Save</Button>
    </Form>
  </div>

  // props didmount
  useEffect(() => {
    props.getUsers(auth.tokenLogin)
  }, [])

  // props diupdate
  useEffect(() => {
    setData({
      users: props.users.data
    })
  }, [props])

  // trigger didupdate
  const getLastData = () => {
    props.getUsers(auth.tokenLogin)
  }

  const addUser = async (event) => {
    event.preventDefault();
    const token = sessionStorage.getItem('token') || localStorage.getItem('token') || auth.tokenLogin;
    if (token) {
      const formData = new FormData(event.target);
      props.addUser(token, formData)
        .then((res) => {
          console.log(res.value.status, 'status')
          if (res.value.status === 201) {
            Swal.fire(
              'Add User Success!',
              'user added successfully.',
              'success'
            ).then(() => {
              getLastData();
              $(document).find('#addUserModal').click()
            })
          }
        }).catch((error) => {
          // console.log(error.response.data.message);
          if (error.response.data.message) {
            Swal.fire(
              'Add User Failed!',
              `${error.response.data.message}`,
              'error'
            )
          } else if (error.response.data.error.message) {
            Swal.fire(
              'Add User Failed!',
              `${error.response.data.error.message}`,
              'error'
            )
          } else {
            Swal.fire(
              'Add User Failed!',
              'Please try again',
              'error'
            )
          }
        })
    }
  }
  const deleteUser = async (id) => {
    const token = sessionStorage.getItem('token') || localStorage.getItem('token') || auth.tokenLogin;
    const user_id = id;
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.value) {
        props.deleteUser(token, user_id)
          .then((res) => {
            if (res.value.status === 200) {
              Swal.fire(
                'Delete User Success!',
                'user deleted successfully.',
                'success'
              ).then(() => {
                getLastData()
              })
            }
          }).catch((error) => {
            console.log(error)
            console.log(error.response.data);
            error.response.data.message
              ? Swal.fire(
                'Delete User Failed!',
                `${error.response.data.message}`,
                'error'
              )
              : Swal.fire(
                'Delete User Failed!',
                'Please try again',
                'error'
              )
          })
      }
    })
  }
  const updateUser = async (event) => {
    event.preventDefault();
    const token = sessionStorage.getItem('token') || localStorage.getItem('token') || auth.tokenLogin;
    const formData = new FormData(event.target);
    const user_id = user.user_id;
    if (formData.get('name') === user.name) {
      formData.delete('name');
    }
    props.patchUser(token, formData, user_id)
      .then((res) => {
        if (res.value.status === 200) {
          Swal.fire(
            'Update User Success!',
            'user updated successfully.',
            'success'
          ).then(() => {
            getLastData();
            $(document).find('#editUserModal').click()
          })
        }
      }).catch((error) => {
        console.log(error);
        error.response.data.message
          ? Swal.fire(
            'Update User Failed!',
            `${error.response.data.message}`,
            'error'
          )
          : Swal.fire(
            'Update User Failed!',
            'Please try again',
            'error'
          )
      })
  }
  const editUser = (id) => {
    const userData = data.users.find(user => user.user_id === id);
    setUser({
      user_id: userData.user_id,
      username: userData.username,
      full_name: userData.full_name,
      email: userData.email,
      role: userData.role
    })
    $('#editUserModal').click()
  }
  return (
    <>
      <MyModal id="editUserModal" modalTitle="Edit Data" modalBody={editModalBody} size="lg" />
      <MyModal id="addUserModal" modalTitle="Add Data" modalBody={addModalBody} size="lg" />
      <Button color="warning" className="mb-1" onClick={() => { $('#addUserModal').click() }}>Add User</Button>
      <MyTable tableHead={tableHead} tableBody={tableBody} />
    </>
  )
}
const mapStateToProps = (state) => ({
  auth: state.auth,
  users: state.users
})

const mapDispathToProps = {
  addUser,
  deleteUser,
  patchUser,
  getUsers,
}
export default connect(mapStateToProps, mapDispathToProps)(Users)
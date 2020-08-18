import React, { useState, useEffect } from 'react'
import { MyTable } from 'components/';
import { connect } from 'react-redux';
import { MyModal } from 'components';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import $ from 'jquery';
import { addAuthor, deleteAuthor, patchAuthor, getAuthors } from 'modules';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';

const Authors = (props) => {
  const [user] = useState(props.auth.data)
  const [data, setData] = useState({
    authors: props.authors.data
  })
  const [author, setAuthor] = useState({
    author_id: 0,
    name: ''
  })
  const tableHead = [
    { title: 'Name' },
    { title: 'Action' }
  ]
  const tableBody = <>
    {data.authors
      ? data.authors.length > 0
        ? data.authors.map((author, index) => {
          return (
            <tr>
              <th scope="row">{index + 1}</th>
              <td>{author.name}</td>
              <td className="">
                <div class="btn-group" role="group" aria-label="Basic example">
                  <Button color="warning
              " style={{
                      width: '50px',
                      padding: '0px '
                    }} onClick={() => { editAuthor(author.author_id) }}>
                    <FontAwesomeIcon icon={faEdit} />
                  </Button>
                  <Button color="danger" style={{
                    width: '50px',
                    padding: '0px ',
                    display: `${user.role > 1 ? 'none' : 'inline-item'}`
                  }}
                    onClick={() => { deleteAuthor(author.author_id) }}>
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </Button>
                </div>
              </td>
            </tr>
          )
        })
        : <></>
      : <></>}
  </>
  const addModalBody = <div>
    <Form onSubmit={(e) => addAuthor(e)}>
      <FormGroup>
        <Label for="">Name</Label>
        <Input type="text" name="name" placeholder="author name" required />
      </FormGroup>
      <Button color="warning" className="float-right">Save</Button>
    </Form>
  </div>
  const editModalBody = <div>
    <Form onSubmit={(e) => updateAuthor(e)}>
      <FormGroup>
        <Label for="">ID</Label>
        <Input type="number" name="author_id" defaultValue={author.author_id} required disabled />
      </FormGroup>
      <FormGroup>
        <Label for="">Name</Label>
        <Input type="text" name="name" placeholder="title here" defaultValue={author.name} required />
      </FormGroup>
      <Button color="warning" className="float-right">Save</Button>
    </Form>
  </div>

  // props didmount
  useEffect(() => {
    props.getAuthors(user.tokenLogin)
  }, [])

  // props diupdate
  useEffect(() => {
    setData({
      authors: props.authors.data
    })
  }, [props])

  // trigger didupdate
  const getLastData = () => {
    props.getAuthors(user.tokenLogin)
  }

  const addAuthor = async (event) => {
    event.preventDefault();
    const token = sessionStorage.getItem('token') || localStorage.getItem('token') || user.tokenLogin;
    if (token) {
      const formData = new FormData(event.target);
      props.addAuthor(token, formData)
        .then((res) => {
          console.log(res.value.status, 'status')
          if (res.value.status === 201) {
            Swal.fire(
              'Add Author Success!',
              'author added successfully.',
              'success'
            ).then(() => {
              getLastData();
              $(document).find('#addAuthorModal').click()
            })
          }
        }).catch((error) => {
          // console.log(error.response.data.message);
          if (error.response.data.message) {
            Swal.fire(
              'Add Author Failed!',
              `${error.response.data.message}`,
              'error'
            )
          } else if (error.response.data.error.message) {
            Swal.fire(
              'Add Author Failed!',
              `${error.response.data.error.message}`,
              'error'
            )
          } else {
            Swal.fire(
              'Add Author Failed!',
              'Please try again',
              'error'
            )
          }
        })
    }
  }
  const deleteAuthor = async (id) => {
    const token = sessionStorage.getItem('token') || localStorage.getItem('token') || user.tokenLogin;
    const author_id = id;
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
        props.deleteAuthor(token, author_id)
          .then((res) => {
            if (res.value.status === 200) {
              props.getAuthors(token);
              Swal.fire(
                'Delete Author Success!',
                'author deleted successfully.',
                'success'
              ).then(() => {
                getLastData();
              })
            }
          }).catch((error) => {
            console.log(error)
            // console.log(error.response.data);
            error.response.data.message
              ? Swal.fire(
                'Delete Author Failed!',
                `${error.response.data.message}`,
                'error'
              )
              : Swal.fire(
                'Delete Author Failed!',
                'Please try again',
                'error'
              )
          })
      }
    })
  }
  const updateAuthor = async (event) => {
    event.preventDefault();
    const token = sessionStorage.getItem('token') || localStorage.getItem('token') || user.tokenLogin;
    const formData = new FormData(event.target);
    const author_id = author.author_id;
    if (formData.get('name') === author.name) {
      formData.delete('name');
    }
    props.patchAuthor(token, formData, author_id)
      .then((res) => {
        if (res.value.status === 200) {
          Swal.fire(
            'Update Author Success!',
            'author updated successfully.',
            'success'
          ).then(() => {
            getLastData();
            $(document).find('#editAuthorModal').click()
          })
        }
      }).catch((error) => {
        console.log(error);
        error.response.data.message
          ? Swal.fire(
            'Update Author Failed!',
            `${error.response.data.message}`,
            'error'
          )
          : Swal.fire(
            'Update Author Failed!',
            'Please try again',
            'error'
          )
      })
  }
  const editAuthor = (id) => {
    const authorData = data.authors.find(author => author.author_id === id);
    setAuthor({
      author_id: id,
      name: authorData.name,
    })
    $('#editAuthorModal').click()
  }
  return (
    <>
      <MyModal id="editAuthorModal" modalTitle="Edit Data" modalBody={editModalBody} size="lg" />
      <MyModal id="addAuthorModal" modalTitle="Add Data" modalBody={addModalBody} size="lg" />
      <Button color="warning" className="mb-1" onClick={() => { $('#addAuthorModal').click() }}>Add Author</Button>
      <MyTable tableHead={tableHead} tableBody={tableBody} />
    </>
  )
}
const mapStateToProps = (state) => ({
  auth: state.auth,
  authors: state.authors
})

const mapDispathToProps = {
  addAuthor,
  deleteAuthor,
  patchAuthor,
  getAuthors
}
export default connect(mapStateToProps, mapDispathToProps)(Authors)
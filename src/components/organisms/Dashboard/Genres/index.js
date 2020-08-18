import React, { useState, useEffect } from 'react'
import { MyTable } from 'components/';
import { connect } from 'react-redux';
import { MyModal } from 'components';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import $ from 'jquery';
import { addGenre, deleteGenre, patchGenre, getGenres } from 'modules';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';

const Genres = (props) => {
  const [user] = useState(props.auth.data)
  const [data, setData] = useState({
    genres: props.genres.data
  })
  const [genre, setGenre] = useState({
    genre_id: 0,
    name: ''
  })
  const tableHead = [
    { title: 'Name' },
    { title: 'Action' }
  ]
  const tableBody = <>
    {data.genres
      ? data.genres.length > 0
        ? data.genres.map((genre, index) => {
          return (
            <tr>
              <th scope="row">{index + 1}</th>
              <td>{genre.name}</td>
              <td className="">
                <div class="btn-group" role="group" aria-label="Basic example">
                  <Button color="warning
              " style={{
                      width: '50px',
                      padding: '0px '
                    }} onClick={() => { editGenre(genre.genre_id) }}>
                    <FontAwesomeIcon icon={faEdit} />
                  </Button>
                  <Button color="danger" style={{
                    width: '50px',
                    padding: '0px ',
                    display: `${user.role > 1 ? 'none' : 'inline-item'}`
                  }}
                    onClick={() => { deleteGenre(genre.genre_id) }}>
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
    <Form onSubmit={(e) => addGenre(e)}>
      <FormGroup>
        <Label for="">Name</Label>
        <Input type="text" name="name" placeholder="genre name" required />
      </FormGroup>
      <Button color="warning" className="float-right">Save</Button>
    </Form>
  </div>
  const editModalBody = <div>
    <Form onSubmit={(e) => updateGenre(e)}>
      <FormGroup>
        <Label for="">ID</Label>
        <Input type="number" name="genre_id" defaultValue={genre.genre_id} required disabled />
      </FormGroup>
      <FormGroup>
        <Label for="">Name</Label>
        <Input type="text" name="name" placeholder="title here" defaultValue={genre.name} required />
      </FormGroup>
      <Button color="warning" className="float-right">Save</Button>
    </Form>
  </div>

  // props didmount
  useEffect(() => {
    props.getGenres(user.tokenLogin)
  }, [])

  // props diupdate
  useEffect(() => {
    setData({
      genres: props.genres.data
    })
  }, [props])

  // trigger didupdate
  const getLastData = () => {
    props.getGenres(user.tokenLogin)
  }

  const addGenre = async (event) => {
    event.preventDefault();
    const token = sessionStorage.getItem('token') || localStorage.getItem('token') || user.tokenLogin;
    if (token) {
      const formData = new FormData(event.target);
      props.addGenre(token, formData)
        .then((res) => {
          console.log(res.value.status, 'status')
          if (res.value.status === 201) {
            Swal.fire(
              'Add Genre Success!',
              'genre added successfully.',
              'success'
            ).then(() => {
              getLastData();
              $(document).find('#addGenreModal').click()
            })
          }
        }).catch((error) => {
          // console.log(error.response.data.message);
          if (error.response.data.message) {
            Swal.fire(
              'Add Genre Failed!',
              `${error.response.data.message}`,
              'error'
            )
          } else if (error.response.data.error.message) {
            Swal.fire(
              'Add Genre Failed!',
              `${error.response.data.error.message}`,
              'error'
            )
          } else {
            Swal.fire(
              'Add Genre Failed!',
              'Please try again',
              'error'
            )
          }
        })
    }
  }
  const deleteGenre = async (id) => {
    const token = sessionStorage.getItem('token') || localStorage.getItem('token') || user.tokenLogin;
    const genre_id = id;
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
        props.deleteGenre(token, genre_id)
          .then((res) => {
            if (res.value.status === 200) {
              Swal.fire(
                'Delete Genre Success!',
                'genre deleted successfully.',
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
                'Delete Genre Failed!',
                `${error.response.data.message}`,
                'error'
              )
              : Swal.fire(
                'Delete Genre Failed!',
                'Please try again',
                'error'
              )
          })
      }
    })
  }
  const updateGenre = async (event) => {
    event.preventDefault();
    const token = sessionStorage.getItem('token') || localStorage.getItem('token') || user.tokenLogin;
    const formData = new FormData(event.target);
    const genre_id = genre.genre_id;
    if (formData.get('name') === genre.name) {
      formData.delete('name');
    }
    props.patchGenre(token, formData, genre_id)
      .then((res) => {
        if (res.value.status === 200) {
          Swal.fire(
            'Update Genre Success!',
            'genre updated successfully.',
            'success'
          ).then(() => {
            getLastData();
            $(document).find('#editGenreModal').click()
          })
        }
      }).catch((error) => {
        console.log(error);
        error.response.data.message
          ? Swal.fire(
            'Update Genre Failed!',
            `${error.response.data.message}`,
            'error'
          )
          : Swal.fire(
            'Update Genre Failed!',
            'Please try again',
            'error'
          )
      })
  }
  const editGenre = (id) => {
    const genreData = data.genres.find(genre => genre.genre_id === id);
    setGenre({
      genre_id: id,
      name: genreData.name,
    })
    $('#editGenreModal').click()
  }
  return (
    <>
      <MyModal id="editGenreModal" modalTitle="Edit Data" modalBody={editModalBody} size="lg" />
      <MyModal id="addGenreModal" modalTitle="Add Data" modalBody={addModalBody} size="lg" />
      <Button color="warning" className="mb-1" onClick={() => { $('#addGenreModal').click() }}>Add Genre</Button>
      <MyTable tableHead={tableHead} tableBody={tableBody} />
    </>
  )
}
const mapStateToProps = (state) => ({
  auth: state.auth,
  genres: state.genres
})

const mapDispathToProps = {
  addGenre,
  deleteGenre,
  patchGenre,
  getGenres
}
export default connect(mapStateToProps, mapDispathToProps)(Genres)
import React, { useState, useEffect } from 'react'
import { MyTable } from 'components/';
import { connect } from 'react-redux';
import { MyModal } from 'components';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import $ from 'jquery';
import { addBook, deleteBook, patchBook, getBooks } from 'modules';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';

const Books = (props) => {
  const [user] = useState(props.auth.data)
  const [data, setData] = useState({
    books: props.books.data,
    authors: props.authors.data,
    genres: props.genres.data
  })
  const [book, setBook] = useState({
    book_id: 0,
    title: '',
    author_id: 0,
    genre_id: '',
    status: 0,
    quantity: 0,
    description: ''
  })
  const tableHead = [
    { title: 'Image' },
    { title: 'Title' },
    { title: 'Author' },
    { title: 'Genre' },
    { title: 'Status' },
    { title: 'Quantity' },
    { title: 'Action' }
  ]
  const tableBody = <>
    {
      data.books.map((book, index) => {
        return (
          <tr>
            <th scope="row">{index + 1}</th>
            <td>
              <img src={book.image} alt="" width="70" />
            </td>
            <td>{book.title}</td>
            <td>{book.author_name}</td>
            <td>{book.genre_name}</td>
            <td>{`${parseInt(book.status) === 0 ? 'Available' : 'Not Available'}`}</td>
            <td>{book.quantity}</td>
            <td className="">
              <div class="btn-group" role="group" aria-label="Basic example">
                <Button color="warning
              " style={{
                    width: '50px',
                    padding: '0px '
                  }} onClick={() => { editBook(book.book_id) }}>
                  <FontAwesomeIcon icon={faEdit} />
                </Button>
                <Button color="danger" style={{
                  width: '50px',
                  padding: '0px ',
                  display: `${user.role > 1 ? 'none' : 'inline-item'}`
                }}
                  onClick={() => { deleteBook(book.book_id) }}>
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
    <Form onSubmit={(e) => addBook(e)}>
      <FormGroup>
        <Label for="">Title</Label>
        <Input type="text" name="title" placeholder="title here" required />
      </FormGroup>
      <FormGroup>
        <Label for="l">Image</Label>
        <Input type="file" name="image" />
      </FormGroup>
      <FormGroup>
        <Label for="">Author</Label>
        <Input type="select" name="author_id" required>
          {data.authors.map(author => {
            return (
              <option key={author.author_id} value={author.author_id}>{author.name}</option>
            )
          })}
        </Input>
      </FormGroup>
      <FormGroup>
        <Label for="">Genre</Label>
        <Input type="select" name="genre_id" required>
          {data.genres.map(genre => {
            return (
              <option key={genre.genre_id} value={genre.genre_id}>{genre.name}</option>
            )
          })}
        </Input>
      </FormGroup>
      <FormGroup>
        <Label for="">Status</Label>
        <Input type="select" name="status" required>
          <option key="0" value="0">Available</option>
          <option key="1" value="1">Not Available</option>
        </Input>
      </FormGroup>
      <FormGroup>
        <Label for="">Quantity</Label>
        <Input type="number" name="quantity" placeholder="quantity" min="1" pattern="[0-9]" required />
      </FormGroup>
      <FormGroup>
        <Label for="">Description</Label>
        <Input type="textarea" name="description" placeholder="description" required />
      </FormGroup>
      <Button color="warning" className="float-right">Save</Button>
    </Form>
  </div>
  const editModalBody = <div>
    <Form onSubmit={(e) => updateBook(e)}>
      <FormGroup>
        <Label for="">ID</Label>
        <Input type="number" name="book_id" placeholder="ID Here" defaultValue={book.book_id} required disabled />
      </FormGroup>
      <FormGroup>
        <Label for="">Title</Label>
        <Input type="text" name="title" placeholder="title here" defaultValue={book.title} required />
      </FormGroup>
      <FormGroup>
        <Label for="l">Image</Label>
        <Input type="file" name="image" />
      </FormGroup>
      <FormGroup>
        <Label for="">Author</Label>
        <Input type="select" name="author_id" defaultValue={book.author_id} required>
          {data.authors.map(author => {
            return (
              <option key={author.author_id} value={author.author_id}>{author.name}</option>
            )
          })}
        </Input>
      </FormGroup>
      <FormGroup>
        <Label for="">Genre</Label>
        <Input type="select" name="genre_id" defaultValue={book.genre_id} required>
          {data.genres.map(genre => {
            return (
              <option key={genre.genre_id} value={genre.genre_id}>{genre.name}</option>
            )
          })}
        </Input>
      </FormGroup>
      <FormGroup>
        <Label for="">Status</Label>
        <Input type="select" name="status" defaultValue={book.status} required>
          <option key="0" value="0">Available</option>
          <option key="1" value="1">Not Available</option>
        </Input>
      </FormGroup>
      <FormGroup>
        <Label for="">Quantity</Label>
        <Input type="number" name="quantity" placeholder="quantity" min="1" pattern="[0-9]" defaultValue={book.quantity} required />
      </FormGroup>
      <FormGroup>
        <Label for="">Description</Label>
        <Input type="textarea" name="description" placeholder="description" defaultValue={book.description} required />
      </FormGroup>
      <Button color="warning" className="float-right">Save</Button>
    </Form>
  </div>

  // props didmount
  useEffect(() => {
    props.getBooks(user.tokenLogin)
  }, [])

  // props diupdate
  useEffect(() => {
    setData({
      books: props.books.data,
      authors: props.authors.data,
      genres: props.genres.data
    })
  }, [props])

  // trigger didupdate
  const getLastData = () => {
    props.getBooks(user.tokenLogin)
  }

  const addBook = async (event) => {
    event.preventDefault();
    const token = sessionStorage.getItem('token') || localStorage.getItem('token') || user.tokenLogin;
    if (token) {
      const formData = new FormData(event.target);
      props.addBook(token, formData)
        .then((res) => {
          console.log(res.value.status, 'status')
          if (res.value.status === 201) {
            Swal.fire(
              'Add Book Success!',
              'book added successfully.',
              'success'
            ).then(() => {
              getLastData();
              $(document).find('#addBookModal').click()
            })
          }
        }).catch((error) => {
          // console.log(error.response.data.message);
          if (error.response.data.message) {
            Swal.fire(
              'Add Book Failed!',
              `${error.response.data.message}`,
              'error'
            )
          } else if (error.response.data.error.message) {
            Swal.fire(
              'Add Book Failed!',
              `${error.response.data.error.message}`,
              'error'
            )
          } else {
            Swal.fire(
              'Add Book Failed!',
              'Please try again',
              'error'
            )
          }
        })
    }
  }
  const deleteBook = async (id) => {
    const token = sessionStorage.getItem('token') || localStorage.getItem('token') || user.tokenLogin;
    const book_id = id;
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
        props.deleteBook(token, book_id)
          .then((res) => {
            if (res.value.status === 200) {
              Swal.fire(
                'Delete Book Success!',
                'book deleted successfully.',
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
                'Delete Book Failed!',
                `${error.response.data.message}`,
                'error'
              )
              : Swal.fire(
                'Delete Book Failed!',
                'Please try again',
                'error'
              )
          })
      }
    })
  }
  const updateBook = async (event) => {
    event.preventDefault();
    const token = sessionStorage.getItem('token') || localStorage.getItem('token') || user.tokenLogin;
    const formData = new FormData(event.target);
    const book_id = book.book_id;
    if (formData.get('title') === book.title) {
      formData.delete('title');
    }
    props.patchBook(token, formData, book_id)
      .then((res) => {
        if (res.value.status === 200) {
          Swal.fire(
            'Update Book Success!',
            'book updated successfully.',
            'success'
          ).then(() => {
            getLastData();
            $(document).find('#editBookModal').click()
          })
        }
      }).catch((error) => {
        console.log(error);
        error.response.data.message
          ? Swal.fire(
            'Update Book Failed!',
            `${error.response.data.message}`,
            'error'
          )
          : Swal.fire(
            'Update Book Failed!',
            'Please try again',
            'error'
          )
      })
  }
  const editBook = (id) => {
    const bookData = data.books.find(book => book.book_id === id);
    setBook({
      book_id: id,
      title: bookData.title,
      author_id: bookData.author_id,
      genre_id: bookData.genre_id,
      status: bookData.status,
      quantity: bookData.quantity,
      description: bookData.description
    })
    $('#editBookModal').click()
  }
  return (
    <>
      <MyModal id="editBookModal" modalTitle="Edit Data" modalBody={editModalBody} size="lg" />
      <MyModal id="addBookModal" modalTitle="Add Data" modalBody={addModalBody} size="lg" />
      <Button color="warning" className="mb-1" onClick={() => { $('#addBookModal').click() }}>Add Book</Button>
      <MyTable tableHead={tableHead} tableBody={tableBody} />
    </>
  )
}
const mapStateToProps = (state) => ({
  auth: state.auth,
  authors: state.authors,
  books: state.books,
  genres: state.genres
})

const mapDispathToProps = {
  addBook,
  deleteBook,
  patchBook,
  getBooks
}
export default connect(mapStateToProps, mapDispathToProps)(Books)
import actionType from './actionType';
import Axios from 'axios';
import { apiUri } from 'configs';

export const getBooks = (token, params = "") => {
  const getParams = params ? `/${params}` : '';
  return {
    type: actionType.GET_BOOKS,
    payload: Axios({
      method: 'GET',
      url: `${apiUri.books.getAllBooks}${getParams}`,
      headers: {
        'authorization': token
      }
    })
  }
}
export const getDetailBook = (token, id) => {
  const getId = id ? `/${id}` : '';
  return {
    type: actionType.GET_BOOKS,
    payload: Axios({
      method: 'GET',
      url: `${apiUri.books.getAllBooks}/${getId}`,
      headers: {
        'authorization': token
      }
    })
  }
}
export const addBook = (token, data) => {
  return {
    type: actionType.ADD_BOOK,
    payload: Axios({
      method: 'POST',
      url: apiUri.books.postBook,
      data: data,
      headers: {
        'Content-Type': 'multipart/form-data',
        'authorization': token
      }
    })
  }
}
export const patchBook = (token, data, id) => {
  const getId = id ? `/${id}` : '';
  return {
    type: actionType.PATCH_BOOK,
    payload: Axios({
      method: 'PATCH',
      url: `${apiUri.books.getAllBooks}${getId}`,
      data: data,
      headers: {
        'Content-Type': 'multipart/form-data',
        'authorization': token
      }
    })
  }
}
export const deleteBook = (token, id) => {
  const getId = id ? `/${id}` : '';
  return {
    type: actionType.DELETE_BOOK,
    payload: Axios({
      method: 'DELETE',
      url: `${apiUri.books.getAllBooks}${getId}`,
      headers: {
        'authorization': token
      }
    })
  }
}
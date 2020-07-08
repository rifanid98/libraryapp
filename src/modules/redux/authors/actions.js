import actionType from './actionType';
import Axios from 'axios';
import { apiUri } from 'configs';

export const getAuthors = (token, params = "") => {
  const getParams = params ? `/${params}` : '';
  return {
    type: actionType.GET_AUTHORS,
    payload: Axios({
      method: 'GET',
      url: `${apiUri.authors.getAllAuthors}${getParams}`,
      headers: {
        'authorization': token
      }
    })
  }
}
export const getDetailAuthors = (token, id) => {
  const getId = id ? `/${id}` : '';
  return {
    type: actionType.GET_AUTHORS,
    payload: Axios({
      method: 'GET',
      url: `${apiUri.authors.getAllAuthors}/${getId}`,
      headers: {
        'authorization': token
      }
    })
  }
}
export const addAuthor = (token, data) => {
  return {
    type: actionType.ADD_AUTHOR,
    payload: Axios({
      method: 'POST',
      url: apiUri.authors.getAllAuthors,
      data: data,
      headers: {
        'Content-Type': 'multipart/form-data',
        'authorization': token
      }
    })
  }
}
export const patchAuthor = (token, data, id) => {
  const getId = id ? `/${id}` : '';
  return {
    type: actionType.PATCH_AUTHOR,
    payload: Axios({
      method: 'PATCH',
      url: `${apiUri.authors.getAllAuthors}${getId}`,
      data: data,
      headers: {
        'Content-Type': 'multipart/form-data',
        'authorization': token
      }
    })
  }
}
export const deleteAuthor = (token, id) => {
  const getId = id ? `/${id}` : '';
  return {
    type: actionType.DELETE_AUTHOR,
    payload: Axios({
      method: 'DELETE',
      url: `${apiUri.authors.getAllAuthors}${getId}`,
      headers: {
        'authorization': token
      }
    })
  }
}
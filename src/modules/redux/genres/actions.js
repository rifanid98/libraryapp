import actionType from './actionType';
import Axios from 'axios';
import { apiUri } from 'configs';

export const getCategories = (token, params = "") => {
  const getParams = params ? `/${params}` : '';
  return {
    type: actionType.GET_GENRES,
    payload: Axios({
      method: 'GET',
      url: `${apiUri.genres}${getParams}`,
      headers: {
        'authorization': token
      }
    })
  }
}
export const getGenres = (token, params = "") => {
  const getParams = params ? `/${params}` : '';
  return {
    type: actionType.GET_GENRES,
    payload: Axios({
      method: 'GET',
      url: `${apiUri.genres}${getParams}`,
      headers: {
        'authorization': token
      }
    })
  }
}
export const getDetailGenre = (token, id) => {
  const getId = id ? `/${id}` : '';
  return {
    type: actionType.GET_GENRES,
    payload: Axios({
      method: 'GET',
      url: `${apiUri.genres}${getId}`,
      headers: {
        'authorization': token
      }
    })
  }
}
export const addGenre = (token, data) => {
  return {
    type: actionType.ADD_GENRE,
    payload: Axios({
      method: 'POST',
      url: apiUri.genres,
      data: data,
      headers: {
        'Content-Type': 'multipart/form-data',
        'authorization': token
      }
    })
  }
}
export const patchGenre = (token, data, id) => {
  const getId = id ? `/${id}` : '';
  return {
    type: actionType.PATCH_GENRE,
    payload: Axios({
      method: 'PATCH',
      url: `${apiUri.genres}${getId}`,
      data: data,
      headers: {
        'Content-Type': 'multipart/form-data',
        'authorization': token
      }
    })
  }
}
export const deleteGenre = (token, id) => {
  const getId = id ? `/${id}` : '';
  return {
    type: actionType.DELETE_GENRE,
    payload: Axios({
      method: 'DELETE',
      url: `${apiUri.genres}${getId}`,
      headers: {
        'authorization': token
      }
    })
  }
}
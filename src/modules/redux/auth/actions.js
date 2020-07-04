import actionType from './actionType';
import Axios from 'axios';
import { apiUri } from 'configs';

export const login = (data) => {
  return {
    type: actionType.LOGIN,
    payload: Axios({
      method: 'POST',
      url: apiUri.auth.login,
      data: data,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }
}
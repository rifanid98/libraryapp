import actionType from './actionType';
import Axios from 'axios';
import { apiUri } from 'configs';

export const getAuthors = (token, params = "") => {
  const getParams = params ? `/${params}` : '';
  return {
    type: actionType.AUTHORS,
    payload: Axios({
      method: 'GET',
      url: `${apiUri.authors.getAllAuthors}${getParams}`,
      headers: {
        'authorization': token
      }
    })
  }
}
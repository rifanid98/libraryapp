import actionType from './actionType';
import Axios from 'axios';
import { apiUri } from 'configs';

export const getCategories = (token, params = "") => {
  const getParams = params ? `/${params}` : '';
  return {
    type: actionType.GENRES,
    payload: Axios({
      method: 'GET',
      url: `${apiUri.genres.getAllGenres}${getParams}`,
      headers: {
        'authorization': token
      }
    })
  }
}
import actionType from './actionType';
import Axios from 'axios';
import { apiUri } from 'configs';

export const getHistories = (token, params = "") => {
  const getParams = params ? `/${params}` : '';
  return {
    type: actionType.HISTORIES,
    payload: Axios({
      method: 'GET',
      url: `${apiUri.histories.getAllHistories}${getParams}`,
      headers: {
        'authorization': token
      }
    })
  }
}
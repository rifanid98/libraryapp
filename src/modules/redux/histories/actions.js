import actionType from './actionType';
import Axios from 'axios';
import { apiUri } from 'configs';

export const getHistories = (token, params = "") => {
  const getParams = params ? `/${params}` : '';
  return {
    type: actionType.GET_HISTORIES,
    payload: Axios({
      method: 'GET',
      url: `${apiUri.histories}${getParams}`,
      headers: {
        'authorization': token
      }
    })
  }
}
export const getPendingHistories = (token, id = "") => {
  const getId = id ? `/${id}` : '';
  return {
    type: actionType.GET_PENDING_HISTORIES,
    payload: Axios({
      method: 'GET',
      url: `${apiUri.histories}/all${getId}`,
      headers: {
        authorization: token
      }
    })
  }
}


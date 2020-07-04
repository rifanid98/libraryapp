import actionType from './actionType';

const initialState = {
  isLoading: false,
  isError: false,
  errorMsg: '',
  data: {}
}


const auth = (state = initialState, action) => {
  switch (action.type) {
    case actionType.LOGIN_PENDING:
      return {
        ...state,
        isLoading: true,
        isError: false
      }

    case actionType.LOGIN_REJECTED:
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMsg: 'Data Rejected'
      }

    case actionType.LOGIN_FULFILLED:
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload.data.data[0]
      }

    default:
      return state;
  }
}

export default auth;
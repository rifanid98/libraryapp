import actionType from './actionType';

const initialState = {
  isLoading: false,
  isError: false,
  errorMsg: '',
  data: {}
}


const histories = (state = initialState, action) => {
  switch (action.type) {
    case actionType.GET_HISTORIES_PENDING:
      return {
        ...state,
        isLoading: true,
        isError: false
      }
    case actionType.GET_HISTORIES_REJECTED:
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMsg: 'Data Rejected'
      }
    case actionType.GET_HISTORIES_FULFILLED:
      return {
        ...state,
        isLoading: false,
        isError: false,
        errorMsg: '',
        data: action.payload.data.data
      }

    case actionType.GET_PENDING_HISTORIES_PENDING:
      return {
        ...state,
        isLoading: true,
        isError: false
      }
    case actionType.GET_PENDING_HISTORIES_REJECTED:
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMsg: 'Data Rejected'
      }
    case actionType.GET_PENDING_HISTORIES_FULFILLED:
      return {
        ...state,
        isLoading: false,
        isError: false,
        errorMsg: '',
        data: action.payload.data.data
      }

    default:
      return state;
  }
}

export default histories;
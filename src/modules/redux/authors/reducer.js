import actionType from './actionType';

const initialState = {
  isLoading: false,
  isError: false,
  errorMsg: '',
  data: {}
}


const authors = (state = initialState, action) => {
  switch (action.type) {
    case actionType.GET_AUTHORS_PENDING:
      return {
        ...state,
        isLoading: true,
        isError: false
      }
    case actionType.GET_AUTHORS_REJECTED:
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMsg: 'Data Rejected'
      }
    case actionType.GET_AUTHORS_FULFILLED:
      return {
        ...state,
        isLoading: false,
        isError: false,
        errorMsg: '',
        data: action.payload.data.data
      }

    case actionType.ADD_AUTHOR_PENDING:
      return {
        ...state,
        isLoading: true,
        isError: false
      }
    case actionType.ADD_AUTHOR_REJECTED:
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMsg: 'Data Rejected'
      }
    case actionType.ADD_AUTHOR_FULFILLED:
      return {
        ...state,
        isLoading: false,
        isError: false,
        errorMsg: '',
      }

    case actionType.PATCH_AUTHOR_PENDING:
      return {
        ...state,
        isLoading: true,
        isError: false
      }
    case actionType.PATCH_AUTHOR_REJECTED:
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMsg: 'Data Rejected'
      }
    case actionType.PATCH_AUTHOR_FULFILLED:
      return {
        ...state,
        isLoading: false,
        isError: false,
        errorMsg: '',
      }

    case actionType.DELETE_AUTHOR_PENDING:
      return {
        ...state,
        isLoading: true,
        isError: false
      }
    case actionType.DELETE_AUTHOR_REJECTED:
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMsg: 'Data Rejected'
      }
    case actionType.DELETE_AUTHOR_FULFILLED:
      return {
        ...state,
        isLoading: false,
        isError: false,
        errorMsg: '',
      }

    default:
      return state;
  }
}

export default authors;
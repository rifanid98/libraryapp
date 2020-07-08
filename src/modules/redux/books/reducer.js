import actionType from './actionType';

const initialState = {
  isLoading: false,
  isError: false,
  errorMsg: '',
  data: {}
}


const books = (state = initialState, action) => {
  switch (action.type) {
    case actionType.GET_BOOKS_PENDING:
      return {
        ...state,
        isLoading: true,
        isError: false
      }
    case actionType.GET_BOOKS_REJECTED:
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMsg: 'Data Rejected'
      }
    case actionType.GET_BOOKS_FULFILLED:
      return {
        ...state,
        isLoading: false,
        isError: false,
        errorMsg: '',
        data: action.payload.data.data
      }

    case actionType.ADD_BOOK_PENDING:
      return {
        ...state,
        isLoading: true,
        isError: false
      }
    case actionType.ADD_BOOK_REJECTED:
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMsg: 'Data Rejected'
      }
    case actionType.ADD_BOOK_FULFILLED:
      return {
        ...state,
        isLoading: false,
        isError: false,
        errorMsg: '',
      }

    case actionType.PATCH_BOOK_PENDING:
      return {
        ...state,
        isLoading: true,
        isError: false
      }
    case actionType.PATCH_BOOK_REJECTED:
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMsg: 'Data Rejected'
      }
    case actionType.PATCH_BOOK_FULFILLED:
      return {
        ...state,
        isLoading: false,
        isError: false,
        errorMsg: '',
      }

    case actionType.DELETE_BOOK_PENDING:
      return {
        ...state,
        isLoading: true,
        isError: false
      }
    case actionType.DELETE_BOOK_REJECTED:
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMsg: 'Data Rejected'
      }
    case actionType.DELETE_BOOK_FULFILLED:
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

export default books;
import actionType from './actionType';

const initialState = {
  isLoading: false,
  isError: false,
  errorMsg: '',
  data: {}
}


const authors = (state = initialState, action) => {
  switch (action.type) {
    case actionType.AUTHORS_PENDING:
      return {
        ...state,
        isLoading: true,
        isError: false
      }

    case actionType.AUTHORS_REJECTED:
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMsg: 'Data Rejected'
      }

    case actionType.AUTHORS_FULFILLED:

      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload.data.data
      }

    default:
      return state;
  }
}

export default authors;
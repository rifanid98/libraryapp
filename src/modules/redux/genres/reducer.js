import actionType from './actionType';

const initialState = {
  isLoading: false,
  isError: false,
  errorMsg: '',
  data: {}
}


const genres = (state = initialState, action) => {
  switch (action.type) {
    case actionType.GENRES_PENDING:
      return {
        ...state,
        isLoading: true,
        isError: false
      }

    case actionType.GENRES_REJECTED:
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMsg: 'Data Rejected'
      }

    case actionType.GENRES_FULFILLED:

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

export default genres;
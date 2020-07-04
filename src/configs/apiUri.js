const baseApiUri = 'http://localhost:3000/libraryapp-api';

const apiUri = {
  auth: {
    login: `${baseApiUri}/auth/login`,
    register: `${baseApiUri}/auth/register`
  },
  books: {
    getAllBooks: `${baseApiUri}/books`,
    getDetailBook: `${baseApiUri}/books`,
    postBook: `${baseApiUri}/books`,
    patchBook: `${baseApiUri}/books`,
    deleteBook: `${baseApiUri}/books`,
    borrowBook: `${baseApiUri}/books`,
    returnBook: `${baseApiUri}/books`
  },
  genres: {
    getAllGenres: `${baseApiUri}/genres`
  },
  histories: {
    getAllHistories: `${baseApiUri}/histories`,
    getPendingHistories: `${baseApiUri}/histories`
  },
  authors: {
    getAllAuthors: `${baseApiUri}/authors`
  }
}

export { apiUri };
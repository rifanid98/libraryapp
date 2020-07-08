import appConfig from "./appConfig";

const apiUri = {
  auth: {
    login: `${appConfig.url.api}/auth/login`,
    register: `${appConfig.url.api}/auth/register`
  },
  books: {
    getAllBooks: `${appConfig.url.api}/books`,
    getDetailBook: `${appConfig.url.api}/books`,
    postBook: `${appConfig.url.api}/books`,
    patchBook: `${appConfig.url.api}/books`,
    deleteBook: `${appConfig.url.api}/books`,
    borrowBook: `${appConfig.url.api}/books`,
    returnBook: `${appConfig.url.api}/books`
  },
  genres: {
    getAllGenres: `${appConfig.url.api}/genres`
  },
  users: `http://localhost:3000/libraryapp-api/users`,
  // users: `${appConfig.url.api}/users`,
  histories: {
    getAllHistories: `${appConfig.url.api}/histories`,
    getPendingHistories: `${appConfig.url.api}/histories`
  },
  authors: {
    getAllAuthors: `${appConfig.url.api}/authors`
  }
}

export { apiUri };



// import { appConfig } from "configs";

// const url = {
//   books: `${appConfig.url.api}/books`,
//   genres: `${appConfig.url.api}/genres`,
//   authors: `${appConfig.url.api}/authors`,
//   users: `${appConfig.url.api}/users`,
//   auth: {
//     login: `${appConfig.url.api}/auth/login`,
//     register: `${appConfig.url.api}/auth/register`
//   }
// };

// export default url;

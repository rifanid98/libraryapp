import appConfig from "./appConfig";

const apiUri = {
  auth: {
    login: `${appConfig.url.api}/auth/login`,
    register: `${appConfig.url.api}/auth/register`
  },
  books: `${appConfig.url.api}/books`,
  genres: `${appConfig.url.api}/genres`,
  users: `${appConfig.url.api}/users`,
  histories: `${appConfig.url.api}/histories`,
  authors: `${appConfig.url.api}/authors`
}

export { apiUri };
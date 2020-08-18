import { API_URL, ORIGIN } from "./env";

const activeConfig = "dev";
const origin = window.location.origin;

const constants = {
  dev: {
    url: {
      api: API_URL,
      assets: ORIGIN + '/libraryapp-api/images',
      origin: ORIGIN
    }
  },

  production: {
    url: {
      api: "",
      assets: "",
      origin: ""
    }
  }
};

const appConfig = constants[activeConfig];

export default appConfig;

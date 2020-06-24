const activeConfig = "dev";
const origin = window.location.origin;

const constants = {
  dev: {
    url: {
      api: "",
      assets: "../assets",
      origin: origin
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

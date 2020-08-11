const activeConfig = "dev";
const origin = window.location.origin;

const constants = {
  dev: {
    url: {
      api: "http://192.168.42.15:3000/libraryapp-api",
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

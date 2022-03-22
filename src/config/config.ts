interface AxiosConfig {
  baseURL: string,
  timeout: number
}
interface Config {
  axios: AxiosConfig
}
const config = {
  development: {
    axios: {
      baseURL: "http://localhost:8080/https://mcf-flight-search-engine.herokuapp.com/api/"
    }
  },
  test: {
    axios: {
      baseURL: "http://localhost:8080/https://mcf-flight-search-engine.herokuapp.com/api/"
    }
  },
  production: {
    axios: {
      baseURL: "https://mcf-flight-search-engine.herokuapp.com/api/"
    }
  }
};
export default config[process.env.NODE_ENV] as Config;

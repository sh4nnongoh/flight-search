import axios from "axios";
import React, { FC, ReactElement } from "react";
import config from "../config/config";
import { MCFFlightsContext } from "./Contexts";
const MCFFlightsContextWrapper: FC = ({ children }): ReactElement => {
  axios.defaults.baseURL = config.axios.baseURL;
  return (
    <MCFFlightsContext.Provider value={{
      getMCFCities: axios
        .get("/v1/cities")
        .then((res) => res)
    }}
    >
      {children}
    </MCFFlightsContext.Provider>
  );
};
export default MCFFlightsContextWrapper;

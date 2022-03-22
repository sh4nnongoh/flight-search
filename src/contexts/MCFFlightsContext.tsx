import axios from "axios";
import React, { FC, ReactElement } from "react";
import config from "../config/config";
import { FlightsParams, MCFFlightsContext } from "./Contexts";
const MCFFlightsContextWrapper: FC = ({ children }): ReactElement => {
  axios.defaults.baseURL = config.axios.baseURL;
  return (
    <MCFFlightsContext.Provider value={{
      getMCFCities: () => axios.get("/v1/cities"),
      getMCFFlights: (params?: FlightsParams) => axios.get("/v1/flights", { params })
    }}
    >
      {children}
    </MCFFlightsContext.Provider>
  );
};
export default MCFFlightsContextWrapper;

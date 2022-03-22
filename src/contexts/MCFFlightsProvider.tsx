import axios from "axios";
import React, {
  createContext, Dispatch, FC, ReactElement, SetStateAction, useState
} from "react";
import config from "../config/config";
export interface Cities {
  data: CitiesData
}
export interface CitiesData {
  total: number,
  result: City[]
}
export interface City {
  code: string,
  name: string,
  country: string
}
export interface FlightsParams {
  origin: string,
  destination: string,
  "departure-date": string,
  "return-date"?: string,
  page?: number,
  "page-size"?: number,
}
export interface ReturnFlights {
  data: ReturnFlightsData
}
export interface ReturnFlightsData {
  total: number,
  result: ReturnFlightObj[]
}
export interface ReturnFlightObj {
  departingFlight: Flight,
  returningFlight: Flight
}
export interface OneWayFlights {
  data: ReturnFlightsData
}
export interface OneWayFlightsData {
  total: number,
  result: Flight[]
}
export interface Flight {
  id: number,
  iata: string,
  flightNo: string,
  price: FlightPrice,
  from: City,
  to: City,
  time: FlightTime
}
export interface FlightPrice {
  amount: number,
  curreny: string
}
export interface FlightTime {
  departure: string,
  arrival: string,
  duration: string
}
const stub = {
  data: {
    total: 0,
    result: []
  }
};
export const MCFFlightsContext = createContext<{
  getMCFCities:() => Promise<Cities>,
  getMCFReturnFlights:(params?: FlightsParams) => Promise<ReturnFlights>,
  getMCFOneWayFlights:(params?: FlightsParams) => Promise<OneWayFlights>,
  returnFlightResults: ReturnFlightObj[] | undefined,
  setReturnFlightResults: Dispatch<SetStateAction<ReturnFlightObj[] | undefined>>,
  oneWayFlightResults: Flight[] | undefined,
  setOneWayFlightResults: Dispatch<SetStateAction<Flight[] | undefined>>,
  loadingFlightResults: boolean,
  setLoadingFlightResults: Dispatch<SetStateAction<boolean>>,
  hasError: boolean,
  setHasError: Dispatch<SetStateAction<boolean>>
    }>({
      getMCFCities: () => Promise.resolve(stub),
      getMCFReturnFlights: () => Promise.resolve(stub),
      getMCFOneWayFlights: () => Promise.resolve(stub),
      returnFlightResults: undefined,
      setReturnFlightResults: () => { /* stub */ },
      oneWayFlightResults: undefined,
      setOneWayFlightResults: () => { /* stub */ },
      loadingFlightResults: false,
      setLoadingFlightResults: () => { /* stub */ },
      hasError: false,
      setHasError: () => { /* stub */ }
    });
const MCFFlightsProvider: FC = ({ children }): ReactElement => {
  axios.defaults.baseURL = config.axios.baseURL;
  const [returnFlightResults, setReturnFlightResults] = useState<ReturnFlightObj[] | undefined>();
  const [oneWayFlightResults, setOneWayFlightResults] = useState<Flight[] | undefined>();
  const [loadingFlightResults, setLoadingFlightResults] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  return (
    <MCFFlightsContext.Provider value={{
      getMCFCities: () => axios.get("/v1/cities"),
      getMCFReturnFlights: (params?: FlightsParams) => axios.get("/v1/flights", { params }),
      getMCFOneWayFlights: (params?: FlightsParams) => axios.get("/v1/flights", { params }),
      returnFlightResults,
      setReturnFlightResults,
      oneWayFlightResults,
      setOneWayFlightResults,
      loadingFlightResults,
      setLoadingFlightResults,
      hasError,
      setHasError
    }}
    >
      {children}
    </MCFFlightsContext.Provider>
  );
};
export default MCFFlightsProvider;

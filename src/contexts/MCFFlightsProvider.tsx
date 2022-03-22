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
export const MCFFlightsContext = createContext<{
  getMCFCities:() => Promise<Cities>,
  getMCFReturnFlights:(params?: FlightsParams) => Promise<ReturnFlights>,
  returnFlightResults: ReturnFlightObj[] | undefined,
  setReturnFlightResults: Dispatch<SetStateAction<ReturnFlightObj[] | undefined>>
    }>({
      getMCFCities: () => Promise.resolve({
        data: {
          total: 0,
          result: []
        }
      }),
      getMCFReturnFlights: () => Promise.resolve({
        data: {
          total: 0,
          result: []
        }
      }),
      returnFlightResults: undefined,
      setReturnFlightResults: () => { /* stub */ }
    });
const MCFFlightsProvider: FC = ({ children }): ReactElement => {
  axios.defaults.baseURL = config.axios.baseURL;
  const [returnFlightResults, setReturnFlightResults] = useState<ReturnFlightObj[] | undefined>();
  return (
    <MCFFlightsContext.Provider value={{
      getMCFCities: () => axios.get("/v1/cities"),
      getMCFReturnFlights: (params?: FlightsParams) => axios.get("/v1/flights", { params }),
      returnFlightResults,
      setReturnFlightResults
    }}
    >
      {children}
    </MCFFlightsContext.Provider>
  );
};
export default MCFFlightsProvider;

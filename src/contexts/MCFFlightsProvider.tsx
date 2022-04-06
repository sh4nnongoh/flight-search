import axios, { AxiosRequestConfig } from "axios";
import React, {
  createContext, Dispatch, FC, ReactElement, SetStateAction, useMemo, useState
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
export interface CityOption {
  value: string,
  displayName: string
}
export interface FlightsParams extends AxiosRequestConfig {
  origin: string,
  destination: string,
  "departure-date": string,
  "return-date"?: string,
  page?: number,
  "page-size"?: number
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
export const MCFCitiesStateContext = createContext<{
  cityOptionList: CityOption[],
  loadingCities: boolean,
  hasCitiesError: boolean,
    }>({
      cityOptionList: [],
      loadingCities: false,
      hasCitiesError: false
    });
export const MCFFlightsStateContext = createContext<{
  returnFlightResults: ReturnFlightObj[] | undefined,
  oneWayFlightResults: Flight[] | undefined,
  loadingFlightResults: boolean,
  hasFlightsError: boolean,
    }>({
      returnFlightResults: undefined,
      oneWayFlightResults: undefined,
      loadingFlightResults: false,
      hasFlightsError: false
    });
export const MCFSetStateContext = createContext<{
  getMCFCities:(axiosParams?: AxiosRequestConfig) => Promise<Cities>,
  getMCFReturnFlights:(params?: FlightsParams) => Promise<ReturnFlights>,
  getMCFOneWayFlights:(params?: FlightsParams) => Promise<OneWayFlights>,
  setReturnFlightResults: Dispatch<SetStateAction<ReturnFlightObj[] | undefined>>,
  setOneWayFlightResults: Dispatch<SetStateAction<Flight[] | undefined>>,
  setLoadingFlightResults: Dispatch<SetStateAction<boolean>>,
  setHasFlightsError: Dispatch<SetStateAction<boolean>>,
  setCityOptionList: Dispatch<SetStateAction<CityOption[]>>,
  setLoadingCities: Dispatch<SetStateAction<boolean>>,
  setHasCitiesError: Dispatch<SetStateAction<boolean>>
    }>({
      getMCFCities: () => Promise.resolve(stub),
      getMCFReturnFlights: () => Promise.resolve(stub),
      getMCFOneWayFlights: () => Promise.resolve(stub),
      setReturnFlightResults: () => { /* stub */ },
      setOneWayFlightResults: () => { /* stub */ },
      setLoadingFlightResults: () => { /* stub */ },
      setHasFlightsError: () => { /* stub */ },
      setCityOptionList: () => { /* stub */ },
      setLoadingCities: () => { /* stub */ },
      setHasCitiesError: () => { /* stub */ }
    });
const MCFFlightsProvider: FC = ({ children }): ReactElement => {
  axios.defaults.baseURL = config.axios.baseURL;
  const [returnFlightResults, setReturnFlightResults] = useState<ReturnFlightObj[] | undefined>();
  const [oneWayFlightResults, setOneWayFlightResults] = useState<Flight[] | undefined>();
  const [loadingFlightResults, setLoadingFlightResults] = useState<boolean>(false);
  const [hasFlightsError, setHasFlightsError] = useState<boolean>(false);
  const [cityOptionList, setCityOptionList] = useState<CityOption[]>([]);
  const [loadingCities, setLoadingCities] = useState<boolean>(false);
  const [hasCitiesError, setHasCitiesError] = useState<boolean>(false);
  return (
    <MCFCitiesStateContext.Provider value={useMemo(() => ({
      cityOptionList,
      loadingCities,
      hasCitiesError
    }), [
      cityOptionList,
      loadingCities,
      hasCitiesError
    ])}
    >
      <MCFFlightsStateContext.Provider value={useMemo(() => ({
        returnFlightResults,
        oneWayFlightResults,
        loadingFlightResults,
        hasFlightsError
      }), [
        returnFlightResults,
        oneWayFlightResults,
        loadingFlightResults,
        hasFlightsError
      ])}
      >
        <MCFSetStateContext.Provider value={useMemo(() => ({
          getMCFCities: (axiosParams?: AxiosRequestConfig) => axios.get("/v1/cities", { ...axiosParams }),
          getMCFReturnFlights: (params?: FlightsParams) => axios.get("/v1/flights", { params }),
          getMCFOneWayFlights: (params?: FlightsParams) => axios.get("/v1/flights", { params }),
          setReturnFlightResults,
          setOneWayFlightResults,
          setLoadingFlightResults,
          setLoadingCities,
          setCityOptionList,
          setHasCitiesError,
          setHasFlightsError
        }), [])}
        >
          {children}
        </MCFSetStateContext.Provider>
      </MCFFlightsStateContext.Provider>
    </MCFCitiesStateContext.Provider>
  );
};
export default MCFFlightsProvider;

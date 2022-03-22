import { createContext } from "react";
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
export const MCFFlightsContext = createContext<{
  getMCFCities:() => Promise<Cities>,
  getMCFFlights:(params?: FlightsParams) => Promise<any>
    }>({
      getMCFCities: () => Promise.resolve({
        data: {
          total: 0,
          result: []
        }
      }),
      getMCFFlights: () => Promise.resolve()
    });

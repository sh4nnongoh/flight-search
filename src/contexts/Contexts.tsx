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
export const MCFFlightsContext = createContext<{
  getMCFCities?: Promise<Cities>
}>({});

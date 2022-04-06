import React, {
  FC, ReactElement
} from "react";
import {
  Container
} from "react-bulma-components";
import FlightDetails from "./components/FlightDetails";
import FlightResults from "./components/FlightResults";
import MCFFlightsProvider from "./contexts/MCFFlightsProvider";
import ProductNameLogo from "./components/ProductNameLogo";
import "./App.css";
const App: FC = (): ReactElement => (
  <MCFFlightsProvider>
    <ProductNameLogo />
    <Container display="flex" flexWrap="wrap">
      <FlightDetails />
      <FlightResults />
    </Container>
  </MCFFlightsProvider>
);
export default App;

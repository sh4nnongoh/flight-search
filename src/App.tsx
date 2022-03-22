import React, {
  FC, ReactElement
} from "react";
import {
  Container, Heading, Image
} from "react-bulma-components";
import FlightsLogo from "./assets/flights-logo.png";
import FlightDetails from "./components/FlightDetails";
import FlightResults from "./components/FlightResults";
import MCFFlightsProvider from "./contexts/MCFFlightsProvider";
const App: FC = (): ReactElement => (
  <MCFFlightsProvider>
    <Container display="flex" marginless style={{ padding: "2.5rem" }}>
      <Image src={FlightsLogo} alt="flights-logo" size={64} />
      <Heading size={1} style={{ paddingLeft: "1rem" }}>
        Flights
      </Heading>
    </Container>
    <Container display="flex" flexWrap="wrap">
      <FlightDetails />
      <FlightResults />
    </Container>
  </MCFFlightsProvider>
);
export default App;

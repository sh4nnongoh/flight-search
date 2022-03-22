import React, {
  FC, ReactElement
} from "react";
import {
  Container, Heading, Image
} from "react-bulma-components";
import FlightsLogo from "./assets/flights-logo.png";
import FlightDetails from "./components/FlightDetails";
import MCFFlightsContextWrapper from "./contexts/MCFFlightsContext";
const App: FC = (): ReactElement => (
  <MCFFlightsContextWrapper>
    <Container display="flex" marginless style={{ padding: "2.5rem" }}>
      <Image src={FlightsLogo} alt="flights-logo" size={64} />
      <Heading size={1} style={{ paddingLeft: "1rem" }}>
        Flights
      </Heading>
    </Container>
    <FlightDetails />
  </MCFFlightsContextWrapper>
);
export default App;

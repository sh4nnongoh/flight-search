import React, {
  FC, ReactElement
} from "react";
import { Container, Heading, Image } from "react-bulma-components";
import FlightsLogo from "./assets/flights-logo.png";
const App: FC = (): ReactElement => (
  <Container display="flex" marginless style={{ padding: "2.5rem" }}>
    <Image src={FlightsLogo} alt="flights-logo" size={64} />
    <Heading size={1} style={{ paddingLeft: "1rem" }}>
      Flights
    </Heading>
  </Container>
);
export default App;

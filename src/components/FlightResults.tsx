import React, {
  FC, ReactElement, useContext
} from "react";
import { Card, Container, Heading } from "react-bulma-components";
import moment from "moment";
import { MCFFlightsContext } from "../contexts/MCFFlightsProvider";
import FlightsLogo from "../assets/flights-logo.png";
const FlightResults: FC = (): ReactElement => {
  const { returnFlightResults } = useContext(MCFFlightsContext);
  return (
    <>
      {returnFlightResults && (
        <Container display="block">
          <Heading style={{ padding: "2rem" }}>
            Your Results
          </Heading>
          <Container display="flex" justifyContent="center" flexDirection="column">
            {returnFlightResults.map((r) => (
              <Card key={`${r.departingFlight.id}${r.returningFlight.id}`} style={{ width: "40rem" }}>
                <Container display="flex" alignItems="center">
                  <Container style={{ padding: "1rem" }}>
                    <Card.Image
                      src={FlightsLogo}
                      style={{ width: "5rem" }}
                    />
                    <Card.Content>
                      {r.departingFlight.iata}
                    </Card.Content>
                  </Container>
                  <Container textAlign="center" style={{ padding: "1rem" }}>
                    <Card.Content paddingless>
                      {r.departingFlight.flightNo}
                    </Card.Content>
                    <Card.Content paddingless>
                      {`${r.departingFlight.from.code} > ${r.departingFlight.to.code}`}
                    </Card.Content>
                    <Card.Content paddingless>
                      {`Depart: ${moment(r.departingFlight.time.departure).format("hh:mma")}`}
                    </Card.Content>
                    <Card.Content paddingless>
                      {`Arrival: ${moment(r.departingFlight.time.arrival).format("hh:mma")}`}
                    </Card.Content>
                  </Container>
                  <Container style={{ padding: "1rem" }}>
                    <Card.Image
                      src={FlightsLogo}
                      style={{ width: "5rem" }}
                    />
                    <Card.Content>
                      {r.returningFlight.iata}
                    </Card.Content>
                  </Container>
                  <Container textAlign="center" style={{ padding: "1rem" }}>
                    <Card.Content paddingless>
                      {r.returningFlight.flightNo}
                    </Card.Content>
                    <Card.Content paddingless>
                      {`${r.returningFlight.from.code} > ${r.returningFlight.to.code}`}
                    </Card.Content>
                    <Card.Content paddingless>
                      {`Depart: ${moment(r.returningFlight.time.departure).format("hh:mma")}`}
                    </Card.Content>
                    <Card.Content paddingless>
                      {`Arrival: ${moment(r.returningFlight.time.arrival).format("hh:mma")}`}
                    </Card.Content>
                  </Container>
                  <Card.Content>
                    {`$${r.returningFlight.price.amount}`}
                  </Card.Content>
                </Container>
              </Card>
            ))}
          </Container>
        </Container>
      )}
    </>
  );
};
export default FlightResults;

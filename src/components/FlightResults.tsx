import React, {
  FC, ReactElement, useContext
} from "react";
import {
  Card, Container, Heading, Loader
} from "react-bulma-components";
import moment from "moment";
import { MCFFlightsContext } from "../contexts/MCFFlightsProvider";
import FlightsLogo from "../assets/flights-logo.png";
import DisplayError from "./DisplayError";
const FlightResults: FC = (): ReactElement => {
  const {
    returnFlightResults, oneWayFlightResults, loadingFlightResults, hasFlightsError
  } = useContext(MCFFlightsContext);
  const oneWayContainer: FC<{
    iata: string
    flightNo: string,
    to: string,
    from: string,
    departure: string,
    arrival: string
  }> = ({
    iata, flightNo, to, from, departure, arrival
  }): ReactElement => (
    <>
      <Container style={{ padding: "1rem" }}>
        <Card.Image
          src={FlightsLogo}
          style={{ width: "5rem" }}
        />
        <Card.Content>
          {iata}
        </Card.Content>
      </Container>
      <Container textAlign="center" style={{ padding: "1rem" }}>
        <Card.Content paddingless>
          {flightNo}
        </Card.Content>
        <Card.Content paddingless>
          {`${from} > ${to}`}
        </Card.Content>
        <Card.Content paddingless>
          {`Depart: ${moment(departure).format("hh:mma")}`}
        </Card.Content>
        <Card.Content paddingless>
          {`Arrival: ${moment(arrival).format("hh:mma")}`}
        </Card.Content>
      </Container>
    </>
  );
  return (
    <>
      {
        !hasFlightsError && loadingFlightResults && (
          <Container display="flex" justifyContent="center">
            <Loader data-testid="loader" style={{ padding: "1rem", margin: "3rem" }} />
          </Container>
        )
      }
      {
        hasFlightsError && (<DisplayError />)
      }
      {!loadingFlightResults && (returnFlightResults || oneWayFlightResults) && (
        <Container display="block">
          <Heading marginless style={{ padding: "2rem" }}>
            Your Results
          </Heading>
          <Container display="flex" justifyContent="center" flexDirection="column">
            {(returnFlightResults?.length === 0 || oneWayFlightResults?.length === 0)
            && (
              <Heading subtitle style={{ padding: "2rem" }}>
                There are no flights available for your current query.
              </Heading>
            )}
            {returnFlightResults?.map((r) => (
              <Card
                key={`${r.departingFlight.id}${r.returningFlight.id}`}
                style={{
                  width: "40rem", maxWidth: "100vw", border: "1px solid lightgrey", marginBottom: "1rem"
                }}
              >
                <Container display="flex" flexWrap="wrap" alignItems="center">
                  {oneWayContainer({
                    iata: r.departingFlight.iata,
                    flightNo: r.departingFlight.flightNo,
                    to: r.departingFlight.to.code,
                    from: r.departingFlight.from.code,
                    departure: r.departingFlight.time.departure,
                    arrival: r.departingFlight.time.arrival
                  })}
                  {oneWayContainer({
                    iata: r.returningFlight.iata,
                    flightNo: r.returningFlight.flightNo,
                    to: r.returningFlight.to.code,
                    from: r.returningFlight.from.code,
                    departure: r.returningFlight.time.departure,
                    arrival: r.returningFlight.time.arrival
                  })}
                  <Card.Content>
                    {`$${r.returningFlight.price.amount}`}
                  </Card.Content>
                </Container>
              </Card>
            ))}
            {oneWayFlightResults?.map((r) => (
              <Card
                key={r.id}
                style={{
                  width: "25rem", maxWidth: "100vw", border: "1px solid lightgrey", marginBottom: "1rem"
                }}
              >
                <Container display="flex" flexWrap="wrap" alignItems="center">
                  {oneWayContainer({
                    iata: r.iata,
                    flightNo: r.flightNo,
                    to: r.to.code,
                    from: r.from.code,
                    departure: r.time.departure,
                    arrival: r.time.arrival
                  })}
                  <Card.Content>
                    {`$${r.price.amount}`}
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

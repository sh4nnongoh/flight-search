import _ from "lodash";
import React, {
  FC, ReactElement, useContext, useEffect, useState
} from "react";
import {
  Container, Heading, Loader, Tabs
} from "react-bulma-components";
import { City, MCFFlightsContext } from "../contexts/MCFFlightsProvider";
import FlightDetailsForm from "./FlightDetailsForm";
const FlightDetails: FC = (): ReactElement => {
  const { getMCFCities, setHasError, hasError } = useContext(MCFFlightsContext);
  const [options, setOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [tab0Active, setTab0Active] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    getMCFCities().then((res) => {
      setOptions(_.get(res, ["data", "data", "result"], []).map((city: City) => ({
        value: city.code,
        displayName: `${city.name}, ${city.country}`
      })));
      setIsLoading(false);
    })
      .catch(() => {
        setHasError(true);
      });
  }, []);
  return (
    <>
      <Container display="flex" justifyContent="center">
        {
          !hasError && isLoading && (
            <Loader data-testid="loader" style={{ padding: "1rem", margin: "3rem" }} />
          )
        }
        {
          hasError && (
            <Heading subtitle style={{ padding: "2rem" }}>
              The application is currently experiencing some issues. Please check back later.
            </Heading>
          )
        }
      </Container>
      {
      !isLoading && (
        <Container style={{ width: "18rem" }}>
          <Tabs align="center">
            <Tabs.Tab active={tab0Active} onClick={() => setTab0Active(true)}>
              One Way
            </Tabs.Tab>
            <Tabs.Tab active={!tab0Active} onClick={() => setTab0Active(false)}>
              Return
            </Tabs.Tab>
          </Tabs>
          <FlightDetailsForm options={options} tab0Active={tab0Active} />
        </Container>
      )
    }
    </>
  );
};
export default FlightDetails;

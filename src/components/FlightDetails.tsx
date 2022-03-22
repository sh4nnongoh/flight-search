import _ from "lodash";
import React, {
  FC, ReactElement, useContext, useEffect, useState
} from "react";
import {
  Container, Loader, Tabs
} from "react-bulma-components";
import { City, MCFFlightsContext } from "../contexts/MCFFlightsProvider";
import DisplayError from "./DisplayError";
import FlightDetailsForm from "./FlightDetailsForm";
const FlightDetails: FC = (): ReactElement => {
  const { getMCFCities, setHasCitiesError, hasCitiesError } = useContext(MCFFlightsContext);
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
        setHasCitiesError(true);
      });
  }, []);
  return (
    <>
      {
        !hasCitiesError && isLoading && (
          <Container display="flex" justifyContent="center">
            <Loader data-testid="loader" style={{ padding: "1rem", margin: "3rem" }} />
          </Container>
        )
      }
      {
        hasCitiesError && (<DisplayError />)
      }
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

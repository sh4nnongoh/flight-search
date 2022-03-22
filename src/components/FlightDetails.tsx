import _ from "lodash";
import React, {
  FC, ReactElement, useContext, useEffect, useState
} from "react";
import {
  Container, Tabs
} from "react-bulma-components";
import { City, MCFFlightsContext } from "../contexts/Contexts";
import FlightDetailsForm from "./FlightDetailsForm";
const FlightDetails: FC = (): ReactElement => {
  const { getMCFCities } = useContext(MCFFlightsContext);
  const [options, setOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(true);
    getMCFCities?.then((res) => {
      setOptions(_.get(res, ["data", "data", "result"], []).map((city: City) => ({
        value: city.code,
        displayName: `${city.name}, ${city.country}`
      })));
      setIsLoading(false);
    });
  }, [getMCFCities]);
  return (
    <>
      {
      !isLoading && (
        <Container style={{ width: "18rem" }}>
          <Tabs align="center">
            <Tabs.Tab>
              One Way
            </Tabs.Tab>
            <Tabs.Tab>
              Return
            </Tabs.Tab>
          </Tabs>
          <FlightDetailsForm options={options} />
        </Container>
      )
    }
    </>
  );
};
export default FlightDetails;

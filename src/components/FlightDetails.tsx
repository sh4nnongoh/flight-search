import React, {
  FC, ReactElement, useContext, useState
} from "react";
import {
  Container, Tabs
} from "react-bulma-components";
import { MCFCitiesStateContext } from "../contexts/MCFFlightsProvider";
import FlightDetailsError from "./FlightDetailsError";
import FlightDetailsForm from "./FlightDetailsForm";
import FlightDetailsLoader from "./FlightDetailsLoader";
const FlightDetails: FC = (): ReactElement => {
  const { loadingCities } = useContext(MCFCitiesStateContext);
  const [tab0Active, setTab0Active] = useState(false);
  return (
    <>
      <FlightDetailsLoader />
      <FlightDetailsError />
      {
      !loadingCities && (
        <Container style={{ width: "18rem" }}>
          <Tabs align="center">
            <Tabs.Tab active={tab0Active} onClick={() => setTab0Active(true)}>
              One Way
            </Tabs.Tab>
            <Tabs.Tab active={!tab0Active} onClick={() => setTab0Active(false)}>
              Return
            </Tabs.Tab>
          </Tabs>
          <FlightDetailsForm tab0Active={tab0Active} />
        </Container>
      )
    }
    </>
  );
};
export default FlightDetails;

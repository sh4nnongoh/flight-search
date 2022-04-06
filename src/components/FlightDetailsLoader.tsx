import React, {
  FC, ReactElement, useContext
} from "react";
import { Container, Loader } from "react-bulma-components";
import { MCFCitiesStateContext } from "../contexts/MCFFlightsProvider";
const FlightDetailsLoader: FC = (): ReactElement => {
  const { hasCitiesError, loadingCities } = useContext(MCFCitiesStateContext);
  const toRender = !hasCitiesError && loadingCities;
  return (
    <>
      {
        toRender && (
          <Container display="flex" justifyContent="center">
            <Loader data-testid="loader" style={{ padding: "1rem", margin: "3rem" }} />
          </Container>
        )
      }
      {
        !toRender && null
      }
    </>
  );
};
export default FlightDetailsLoader;

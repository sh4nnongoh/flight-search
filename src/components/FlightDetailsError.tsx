import React, {
  FC, ReactElement, useContext
} from "react";
import { MCFCitiesStateContext } from "../contexts/MCFFlightsProvider";
import DisplayError from "./DisplayError";
const FlightDetailsError: FC = (): ReactElement => {
  const { hasCitiesError } = useContext(MCFCitiesStateContext);
  return (
    <>
      {
        hasCitiesError && (<DisplayError />)
      }
      {
        !hasCitiesError && null
      }
    </>
  );
};
export default FlightDetailsError;

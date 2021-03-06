import _ from "lodash";
import moment from "moment";
import React, {
  FC, ReactElement, useContext, useState
} from "react";
import {
  Button, Container, Form
} from "react-bulma-components";
import { MCFCitiesStateContext, MCFSetStateContext } from "../contexts/MCFFlightsProvider";
const FlightDetailsForm: FC<{
  tab0Active: boolean
}> = ({ tab0Active }): ReactElement => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const {
    getMCFReturnFlights,
    setReturnFlightResults,
    getMCFOneWayFlights,
    setOneWayFlightResults,
    setLoadingFlightResults,
    setHasFlightsError
  } = useContext(MCFSetStateContext);
  const { cityOptionList } = useContext(MCFCitiesStateContext);
  const optionList = [
    {
      value: "",
      displayName: ""
    },
    ...cityOptionList
  ].map((opt) => <option key={opt.value} value={opt.value}>{opt.displayName}</option>);
  const onSearch = () => {
    setLoadingFlightResults(true);
    setReturnFlightResults(undefined);
    setOneWayFlightResults(undefined);
    setHasFlightsError(false);
    if (tab0Active) {
      getMCFOneWayFlights({
        origin: from,
        destination: to,
        "departure-date": departureDate
      }).then((r) => {
        setLoadingFlightResults(false);
        setOneWayFlightResults(_.get(r, ["data", "data", "result"], []));
      }).catch(() => {
        setHasFlightsError(true);
      });
    } else {
      getMCFReturnFlights({
        origin: from,
        destination: to,
        "departure-date": departureDate,
        "return-date": returnDate
      }).then((r) => {
        setLoadingFlightResults(false);
        setReturnFlightResults(_.get(r, ["data", "data", "result"], []));
      }).catch(() => {
        setHasFlightsError(true);
      });
    }
  };
  return (
    <Container display="flex" flexDirection="column" alignItems="center">
      <form style={{ width: "18rem" }}>
        <Form.Field>
          <Form.Label htmlFor="from-options">
            From
          </Form.Label>
          <Form.Control>
            <Form.Select
              id="from-options"
              onChange={(e) => setFrom(e.target.value)}
            >
              {optionList}
            </Form.Select>
          </Form.Control>
        </Form.Field>
        <Form.Field>
          <Form.Label htmlFor="to-options">
            To
          </Form.Label>
          <Form.Control>
            <Form.Select id="to-options" onChange={(e) => setTo(e.target.value)}>
              {optionList}
            </Form.Select>
          </Form.Control>
        </Form.Field>
        <Form.Field>
          <Form.Label htmlFor="departure-date">
            Departure Date
          </Form.Label>
          <Form.Control>
            <input id="departure-date" type="date" onChange={(e) => setDepartureDate(e.target.value)} />
          </Form.Control>
        </Form.Field>
        {
          !tab0Active && (
            <Form.Field>
              <Form.Label htmlFor="return-date">
                Return Date
              </Form.Label>
              <Form.Control>
                <input id="return-date" type="date" onChange={(e) => setReturnDate(e.target.value)} />
              </Form.Control>
            </Form.Field>
          )
        }
      </form>
      <Button
        color="primary"
        style={{ margin: "1.5rem" }}
        onClick={onSearch}
        disabled={
          (!tab0Active && (from === "" || to === "" || departureDate === "" || returnDate === ""))
          || (tab0Active && (from === "" || to === "" || departureDate === ""))
          || (!tab0Active && moment(returnDate).isBefore(moment(departureDate)))
        }
      >
        Search
      </Button>
    </Container>
  );
};
export default FlightDetailsForm;

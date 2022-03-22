import React, {
  FC, ReactElement, useContext, useState
} from "react";
import {
  Button, Container, Form
} from "react-bulma-components";
import { MCFFlightsContext } from "../contexts/Contexts";
interface OptionType {
  value: string,
  displayName: string
}
const FlightDetailsForm: FC<{
  options: OptionType[],
  tab0Active: boolean
}> = ({ options, tab0Active }): ReactElement => {
  const optionList = options.map((opt) => <option key={opt.value} value={opt.value}>{opt.displayName}</option>);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const { getMCFFlights } = useContext(MCFFlightsContext);
  const onSearch = () => {
    getMCFFlights({
      origin: from,
      destination: to,
      "departure-date": departureDate,
      "return-date": returnDate
    }).then((r) => {
      console.log(r);
    }).catch((e) => {
      console.log(e);
    });
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
      <Button color="primary" style={{ margin: "1.5rem" }} onClick={onSearch}>
        Search
      </Button>
    </Container>
  );
};
export default FlightDetailsForm;
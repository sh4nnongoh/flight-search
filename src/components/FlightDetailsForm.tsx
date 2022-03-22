import bulmaCalendar from "bulma-calendar";
import React, {
  FC, ReactElement, useEffect
} from "react";
import {
  Button, Container, Form
} from "react-bulma-components";
interface OptionType {
  value: string,
  displayName: string
}
const FlightDetailsForm: FC<{options: OptionType[]}> = ({ options }): ReactElement => {
  const optionList = options.map((opt) => <option key={opt.value} value={opt.value}>{opt.displayName}</option>);
  useEffect(() => {
    bulmaCalendar.attach("[type=\"date\"]");
  }, []);
  return (
    <Container display="flex" flexDirection="column" alignItems="center">
      <form style={{ width: "18rem" }}>
        <Form.Field>
          <Form.Label htmlFor="from-options">
            From
          </Form.Label>
          <Form.Control>
            <Form.Select id="from-options">
              {optionList}
            </Form.Select>
          </Form.Control>
        </Form.Field>
        <Form.Field>
          <Form.Label htmlFor="to-options">
            To
          </Form.Label>
          <Form.Control>
            <Form.Select id="to-options">
              {optionList}
            </Form.Select>
          </Form.Control>
        </Form.Field>
        <Form.Field>
          <Form.Label htmlFor="departure-date">
            Departure Date
          </Form.Label>
          <Form.Control>
            <input id="departure-date" type="date" />
          </Form.Control>
        </Form.Field>
        <Form.Field>
          <Form.Label htmlFor="return-date">
            Return Date
          </Form.Label>
          <Form.Control>
            <input id="return-date" type="date" />
          </Form.Control>
        </Form.Field>
      </form>
      <Button color="primary" style={{ margin: "1.5rem" }}>
        Search
      </Button>
    </Container>
  );
};
export default FlightDetailsForm;

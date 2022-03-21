import bulmaCalendar from "bulma-calendar";
import React, {
  FC, ReactElement, useEffect
} from "react";
import {
  Button,
  Container, Form, Tabs
} from "react-bulma-components";
const FlightDetailsForm: FC = (): ReactElement => {
  useEffect(() => {
    bulmaCalendar.attach("[type=\"date\"]");
  }, []);
  return (
    <Container style={{ width: "18rem" }}>
      <Tabs align="center">
        <Tabs.Tab>
          One Way
        </Tabs.Tab>
        <Tabs.Tab>
          Return
        </Tabs.Tab>
      </Tabs>
      <Container display="flex" flexDirection="column" alignItems="center">
        <form style={{ width: "18rem" }}>
          <Form.Field>
            <Form.Label htmlFor="from-options">
              From
            </Form.Label>
            <Form.Control>
              <Form.Select id="from-options">
                <option value="Singapore">Singapore</option>
                <option value="Tokyo, Japan">Tokyo, Japan</option>
              </Form.Select>
            </Form.Control>
          </Form.Field>
          <Form.Field>
            <Form.Label htmlFor="to-options">
              To
            </Form.Label>
            <Form.Control>
              <Form.Select id="to-options">
                <option value="Singapore">Singapore</option>
                <option value="Tokyo, Japan">Tokyo, Japan</option>
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
    </Container>
  );
};
export default FlightDetailsForm;

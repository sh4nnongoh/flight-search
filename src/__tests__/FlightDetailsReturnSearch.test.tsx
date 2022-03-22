import React from "react";
import {
  fireEvent, render, screen, waitFor
} from "@testing-library/react";
import axios from "axios";
import userEvent from "@testing-library/user-event";
import App from "../App";
const userStory = `
GIVEN a list of flight data for return trips between Singapore and Japan,
WHEN user navigates to the webapp,
searches for return trips between Singapore and Japan,
THEN a request is made with the relevant data,
and user sees the following:
(1) "Your Results" Header
(2) The list of flight data between Singapore and Japan
`;
describe(userStory, () => {
  const cities = [{
    code: "SIN",
    name: "Singapore",
    country: "Singapore"
  }, {
    code: "TYO",
    name: "Tokyo",
    country: "Japan"
  }];
  const departureDate = "2022-03-15";
  const returnDate = "2022-03-16";
  let datePickers: HTMLElement[];
  beforeEach(async () => {
    axios.get = jest.fn().mockResolvedValueOnce({
      data: {
        data: {
          result: cities
        }
      }
    })
      .mockResolvedValueOnce({});
    render(<App />);
    await waitFor(() => screen.getByText(/^Return$/));
    userEvent.selectOptions(screen.getByRole("combobox", { name: /From/i }), screen.getAllByText(/Singapore/i)[0]);
    userEvent.selectOptions(screen.getByRole("combobox", { name: /To/i }), screen.getAllByText(/Tokyo, Japan/i)[1]);
    datePickers = screen.getAllByDisplayValue("");
    fireEvent.change(datePickers[0], { target: { value: departureDate } });
    fireEvent.change(datePickers[1], { target: { value: returnDate } });
    fireEvent.click(screen.getByRole("button", { name: /Search/i }));
  });
  it("calls axios with the correct data", () => {
    expect(datePickers[0]).toHaveValue(departureDate);
    expect(datePickers[1]).toHaveValue(returnDate);
    expect(axios.get).toHaveBeenNthCalledWith(1, "/v1/cities");
    expect(axios.get).toHaveBeenNthCalledWith(2, "/v1/flights", {
      params: {
        origin: cities[0].code,
        destination: cities[1].code,
        "departure-date": departureDate,
        "return-date": returnDate
      }
    });
  });
});

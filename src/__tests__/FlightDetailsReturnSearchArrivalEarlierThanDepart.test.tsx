import React from "react";
import {
  fireEvent, render, screen, waitFor
} from "@testing-library/react";
import axios from "axios";
import userEvent from "@testing-library/user-event";
import App from "../App";
const userStory = `
GIVEN no initial state,
WHEN user enters all the fields for Return search,
and sets the Arrival Date earlier than the Depart Date,
THEN the Search button is disabled.
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
  const returnDate = "2022-03-24";
  const departureDate = "2022-03-27";
  let datePickers: HTMLElement[];
  beforeEach(async () => {
    axios.get = jest.fn()
      .mockResolvedValue({
        data: {
          data: {
            result: cities
          }
        }
      });
    render(<App />);
    await waitFor(() => screen.getByText(/^Return$/));
  });
  it("shows disabled search", () => {
    userEvent.selectOptions(screen.getByRole("combobox", { name: /From/i }), screen.getAllByText(/Tokyo, Japan/i)[0]);
    userEvent.selectOptions(screen.getByRole("combobox", { name: /To/i }), screen.getAllByText(/Singapore/i)[1]);
    datePickers = screen.getAllByDisplayValue("");
    fireEvent.change(datePickers[0], { target: { value: departureDate } });
    fireEvent.change(datePickers[1], { target: { value: returnDate } });
    expect(screen.getByRole("button", { name: /Search/i })).toHaveAttribute("disabled");
  });
});

import React from "react";
import {
  fireEvent, render, screen, waitFor
} from "@testing-library/react";
import axios from "axios";
import userEvent from "@testing-library/user-event";
import App from "../App";
const userStory = `
GIVEN a list of countries,
WHEN user loads the webapp,
and fills up the form except for one field,
THEN the search button is disable.
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
  const departureDate = "2022-03-24";
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
    await waitFor(() => screen.getByText(/^One Way$/));
    fireEvent.click(screen.getByText(/^One Way$/));
  });
  it("shows disabled search when 'From' info is missing", () => {
    userEvent.selectOptions(screen.getByRole("combobox", { name: /To/i }), screen.getAllByText(/Tokyo, Japan/i)[1]);
    datePickers = screen.getAllByDisplayValue("");
    fireEvent.change(datePickers[0], { target: { value: departureDate } });
    expect(screen.getByRole("button", { name: /Search/i })).toHaveAttribute("disabled");
  });
  it("shows disabled search when 'To' info is missing", () => {
    userEvent.selectOptions(screen.getByRole("combobox", { name: /From/i }), screen.getAllByText(/Tokyo, Japan/i)[0]);
    datePickers = screen.getAllByDisplayValue("");
    fireEvent.change(datePickers[0], { target: { value: departureDate } });
    expect(screen.getByRole("button", { name: /Search/i })).toHaveAttribute("disabled");
  });
  it("shows disabled search when 'Depart Date' info is missing", () => {
    userEvent.selectOptions(screen.getByRole("combobox", { name: /From/i }), screen.getAllByText(/Tokyo, Japan/i)[0]);
    userEvent.selectOptions(screen.getByRole("combobox", { name: /To/i }), screen.getAllByText(/Singapore/i)[1]);
    datePickers = screen.getAllByDisplayValue("");
    expect(screen.getByRole("button", { name: /Search/i })).toHaveAttribute("disabled");
  });
});

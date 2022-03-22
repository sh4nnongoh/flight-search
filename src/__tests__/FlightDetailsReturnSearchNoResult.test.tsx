import React from "react";
import {
  fireEvent, render, screen, waitFor
} from "@testing-library/react";
import axios from "axios";
import userEvent from "@testing-library/user-event";
import App from "../App";
const userStory = `
GIVEN no return flight data available on today's date from Singapore to Japan,
WHEN user navigates to the webapp,
searches for return flights from Singapore to Japan,
THEN user sees the following:
(1) "Your Results" Header
(2) A text stating "There are no flights available for your current query."
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
  const returnDate = "2022-03-25";
  let datePickers: HTMLElement[];
  beforeEach(async () => {
    axios.get = jest.fn()
      .mockResolvedValueOnce({
        data: {
          data: {
            result: cities
          }
        }
      })
      .mockResolvedValueOnce({
        data: {
          data: {
            result: []
          }
        }
      });
    render(<App />);
    await waitFor(() => screen.getByText(/^Return$/));
    fireEvent.click(screen.getByText(/^Return$/));
    userEvent.selectOptions(screen.getByRole("combobox", { name: /From/i }), screen.getAllByText(/Singapore/i)[0]);
    userEvent.selectOptions(screen.getByRole("combobox", { name: /To/i }), screen.getAllByText(/Tokyo, Japan/i)[1]);
    datePickers = screen.getAllByDisplayValue("");
    fireEvent.change(datePickers[0], { target: { value: departureDate } });
    fireEvent.change(datePickers[1], { target: { value: returnDate } });
    fireEvent.click(screen.getByRole("button", { name: /Search/i }));
    await waitFor(() => screen.getByText(/Your Results/i));
  });
  it("shows the 'Your Results' header", () => {
    expect(screen.getByText(/Your Results/i)).toBeInTheDocument();
  });
  it("shows a text stating 'There are no flights available for your current query.'", () => {
    expect(screen.getByText(/There are no flights available for your current query./i)).toBeInTheDocument();
  });
});

import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import App from "../App";
const userStory = `
GIVEN a list of possible countries,
WHEN user navigates to the webapp,
THEN user sees a flight details form for "Return" trips consisting of the following details:
(1) From Dropdown with a list of possible countries to choose from
(2) To Dropdown with a list of possible countries to choose from
(3) Departure Date Calendar
(4) Return Date Calendar
(5) Search Button
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
  beforeEach(async () => {
    axios.get = jest.fn().mockResolvedValue({
      data: {
        data: {
          result: cities
        }
      }
    });
    render(<App />);
    await waitFor(() => screen.getByText(/^Return$/));
  });
  it("shows the 2 tabs", () => {
    expect(screen.getByText(/^One Way$/)).toBeInTheDocument();
    expect(screen.getByText(/^Return$/)).toBeInTheDocument();
  });
  it("shows the labels", () => {
    [
      /From/i,
      /To/i,
      /Departure Date/i,
      /Return Date/i
    ].forEach((label) => {
      expect(screen.getByLabelText(label)).toBeInTheDocument();
    });
  });
  it("shows the options", () => {
    [
      { name: /Singapore/i },
      { name: /Tokyo, Japan/i }
    ].forEach((opt) => {
      expect(screen.getAllByRole("option", opt)).toHaveLength(2);
    });
  });
  it("shows the 2 date pickers", () => {
    const datePickers = screen.getAllByDisplayValue("");
    expect(datePickers).toHaveLength(2);
    datePickers.forEach((element) => {
      expect(element).toHaveAttribute("type", "date");
    });
  });
  it("shows the Search Button", () => {
    expect(screen.getByRole("button", { name: /Search/i })).toBeInTheDocument();
  });
});

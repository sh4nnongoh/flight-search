import React from "react";
import {
  fireEvent, render, screen, waitFor
} from "@testing-library/react";
import axios from "axios";
import App from "../App";
const userStory = `
GIVEN a list of possible countries,
WHEN user navigates to the webapp,
and clicks on the "One Way" tab,
THEN user sees a flight details form for "One Way" trips consisting of the following details:
(1) From Dropdown with a list of possible countries to choose from
(2) To Dropdown with a list of possible countries to choose from
(3) Departure Date Calendar with default value of Today's date
(4) no Return Date input
(5) Search Button
(6) The 'One Way' tab is active
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
    await waitFor(() => screen.getByText(/^One Way$/));
    fireEvent.click(screen.getByText(/^One Way$/));
  });
  it("shows the labels", () => {
    [
      /From/i,
      /To/i,
      /Departure Date/i
    ].forEach((label) => {
      expect(screen.getByLabelText(label)).toBeInTheDocument();
    });
  });
  it("shows does not show Return Date", () => {
    expect(screen.queryByLabelText(/Return Date/i)).not.toBeInTheDocument();
  });
  it("shows the options", () => {
    [
      { name: /Singapore/i },
      { name: /Tokyo, Japan/i }
    ].forEach((opt) => {
      expect(screen.getAllByRole("option", opt)).toHaveLength(2);
    });
  });
  it("shows 1 date pickers", () => {
    const datePickers = screen.getAllByDisplayValue("").slice(-1);
    expect(datePickers).toHaveLength(1);
    datePickers.forEach((element) => {
      expect(element).toHaveAttribute("type", "date");
    });
  });
  it("shows the Search Button", () => {
    expect(screen.getByRole("button", { name: /Search/i })).toBeInTheDocument();
  });
  it("shows the 'One Way' tab as active", () => {
    const tabs = screen.getAllByRole("listitem", { name: "" });
    expect(tabs[0]).toHaveClass("is-active");
  });
});

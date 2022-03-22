import React from "react";
import {
  fireEvent, render, screen, waitFor
} from "@testing-library/react";
import axios from "axios";
import App from "../App";
const userStory = `
GIVEN no initial state,
WHEN user navigates to the webapp,
clicks on the One Way tab,
clicks on the Return tab,
THEN user sees a flight details form for "Return" trips consisting of the following details:
(1) Return Date Calendar
(2) The active tab to be "Return"
`;
describe(userStory, () => {
  beforeEach(async () => {
    axios.get = jest.fn().mockResolvedValue({
      data: {
        data: {
          result: []
        }
      }
    });
    render(<App />);
    await waitFor(() => screen.getByText(/^One Way$/));
    fireEvent.click(screen.getByText(/^One Way$/));
    fireEvent.click(screen.getByText(/^Return$/));
  });
  it("shows the Return Date Label", () => {
    [
      /Return Date/i
    ].forEach((label) => {
      expect(screen.getByLabelText(label)).toBeInTheDocument();
    });
  });
  it("shows 2 date pickers", () => {
    const datePickers = screen.getAllByDisplayValue("").slice(-2);
    expect(datePickers).toHaveLength(2);
    datePickers.forEach((element) => {
      expect(element).toHaveAttribute("type", "date");
    });
  });
  it("shows the 'Return' tab as active", () => {
    const tabs = screen.getAllByRole("listitem", { name: "" });
    expect(tabs[1]).toHaveClass("is-active");
  });
});

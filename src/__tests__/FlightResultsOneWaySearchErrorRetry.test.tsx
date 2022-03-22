import React from "react";
import {
  fireEvent, render, screen, waitFor
} from "@testing-library/react";
import axios from "axios";
import userEvent from "@testing-library/user-event";
import App from "../App";
const userStory = `
GIVEN the "/api/v1/flights" endpoint being unavailable,
WHEN user navigates to the webapp,
and searches for One Way flights,
and waits for the request to fail,
and searches for One Way flights again,
THEN user should not see the Error message if the request is successful.
`;
describe(userStory, () => {
  it("shows the error message", async () => {
    const cities = [{
      code: "SIN",
      name: "Singapore",
      country: "Singapore"
    }, {
      code: "TYO",
      name: "Tokyo",
      country: "Japan"
    }];
    axios.get = jest.fn()
      .mockResolvedValueOnce({
        data: {
          data: {
            result: cities
          }
        }
      })
      .mockRejectedValueOnce("ERROR")
      .mockResolvedValueOnce("SUCCESS");
    render(<App />);
    await waitFor(() => screen.getByText(/^One Way$/));
    fireEvent.click(screen.getByText(/^One Way$/));
    userEvent.selectOptions(screen.getByRole("combobox", { name: /From/i }), screen.getAllByText(/Singapore/i)[0]);
    userEvent.selectOptions(screen.getByRole("combobox", { name: /To/i }), screen.getAllByText(/Tokyo, Japan/i)[1]);
    const datePickers = screen.getAllByDisplayValue("");
    const departureDate = "2022-03-24";
    fireEvent.change(datePickers[0], { target: { value: departureDate } });
    fireEvent.click(screen.getByRole("button", { name: /Search/i }));
    screen.getByTestId("loader");
    const errorMsg = /The application is currently experiencing some issues. Please check back later./i;
    await waitFor(() => screen.getByText(errorMsg));
    expect(screen.queryByTestId("loader")).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /Search/i }));
    await waitFor(() => screen.getByText(/Your Result/i));
    expect(screen.queryByText(errorMsg)).not.toBeInTheDocument();
  });
});

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
and searches for Return flights,
THEN user sees the follow text:
"The application is currently experiencing some issues. Please check back later."
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
      .mockRejectedValueOnce("ERROR");
    render(<App />);
    await waitFor(() => screen.getByText(/^Return$/));
    fireEvent.click(screen.getByText(/^Return$/));
    userEvent.selectOptions(screen.getByRole("combobox", { name: /From/i }), screen.getAllByText(/Singapore/i)[0]);
    userEvent.selectOptions(screen.getByRole("combobox", { name: /To/i }), screen.getAllByText(/Tokyo, Japan/i)[1]);
    const datePickers = screen.getAllByDisplayValue("");
    const departureDate = "2022-03-24";
    const arrivalDate = "2022-03-25";
    fireEvent.change(datePickers[0], { target: { value: departureDate } });
    fireEvent.change(datePickers[1], { target: { value: arrivalDate } });
    fireEvent.click(screen.getByRole("button", { name: /Search/i }));
    screen.getByTestId("loader");
    await waitFor(() => screen
      .getByText(/The application is currently experiencing some issues. Please check back later./i));
    expect(screen.queryByTestId("loader")).not.toBeInTheDocument();
  });
});

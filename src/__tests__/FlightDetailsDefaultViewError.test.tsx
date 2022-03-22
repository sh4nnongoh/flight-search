import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import App from "../App";
const userStory = `
GIVEN the "/api/v1/cities" endpoint being unavailable,
WHEN user navigates to the webapp,
THEN user sees the follow text:
"The application is currently experiencing some issues. Please check back later."
`;
describe(userStory, () => {
  it("shows the error message", async () => {
    axios.get = jest.fn().mockRejectedValue("ERROR");
    render(<App />);
    screen.getByTestId("loader");
    await waitFor(() => screen
      .getByText(/The application is currently experiencing some issues. Please check back later./i));
  });
});

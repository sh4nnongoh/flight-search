import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../App";
const userStory = `
GIVEN no initial state,
WHEN user navigates to the webapp,
THEN user sees the Company Logo, and the App name.
`;
describe(userStory, () => {
  render(<App />);
  it("shows the Company Logo and the App name", () => {
    expect(screen.getByText(/Flights/i)).toBeInTheDocument();
    expect(screen.getByAltText(/flights-logo/i)).toBeInTheDocument();
  });
});

import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../App";
const userStory = `
GIVEN no initial state,
WHEN user navigates to the webapp,
THEN user does not see any flight data.
`;
describe(userStory, () => {
  render(<App />);
  it("does not show 'Your Results'", () => {
    expect(screen.queryByText(/Your Results/i)).not.toBeInTheDocument();
  });
});

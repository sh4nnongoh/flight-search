import React from "react";
import {
  fireEvent, render, screen, waitFor
} from "@testing-library/react";
import axios from "axios";
import userEvent from "@testing-library/user-event";
import App from "../App";
const userStory = `
GIVEN a list of flight data for return trips between Singapore and Japan,
WHEN user navigates to the webapp,
searches for return trips between Singapore and Japan,
THEN a request is made with the relevant data,
and user sees the following:
(1) "Your Results" Header
(2) The list of flight data between Singapore and Japan
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
  const flights = [{
    departingFlight: {
      id: 1,
      iata: "SQ",
      flightNo: "SQ-997",
      price: {
        amount: 964,
        currency: "SGD"
      },
      from: {
        code: "SIN",
        name: "Singapore",
        country: "Singapore"
      },
      to: {
        code: "TYO",
        name: "Tokyo",
        country: "Japan"
      },
      time: {
        departure: "2022-03-24T13:40:00+08:00",
        arrival: "2022-03-25T03:10:00+08:00",
        duration: "13h30m"
      }
    },
    returningFlight: {
      id: 2,
      iata: "ABC",
      flightNo: "ABC-998",
      price: {
        amount: 964,
        currency: "SGD"
      },
      from: {
        code: "TYO",
        name: "Tokyo",
        country: "Japan"
      },
      to: {
        code: "SIN",
        name: "Singapore",
        country: "Singapore"
      },
      time: {
        departure: "2022-03-27T14:40:00+08:00",
        arrival: "2022-03-28T04:10:00+08:00",
        duration: "13h30m"
      }
    }
  }];
  const departureDate = "2022-03-24";
  const returnDate = "2022-03-27";
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
            result: flights
          }
        }
      });
    render(<App />);
    await waitFor(() => screen.getByText(/^Return$/));
    userEvent.selectOptions(screen.getByRole("combobox", { name: /From/i }), screen.getAllByText(/Singapore/i)[0]);
    userEvent.selectOptions(screen.getByRole("combobox", { name: /To/i }), screen.getAllByText(/Tokyo, Japan/i)[1]);
    datePickers = screen.getAllByDisplayValue("");
    fireEvent.change(datePickers[0], { target: { value: departureDate } });
    fireEvent.change(datePickers[1], { target: { value: returnDate } });
    fireEvent.click(screen.getByRole("button", { name: /Search/i }));
    await waitFor(() => screen.getByText(/Your Results/i));
  });
  it("calls axios with the correct data", () => {
    expect(datePickers).toHaveLength(2);
    expect(datePickers[0]).toHaveValue(departureDate);
    expect(datePickers[1]).toHaveValue(returnDate);
    expect(axios.get).toHaveBeenNthCalledWith(1, "/v1/cities");
    expect(axios.get).toHaveBeenNthCalledWith(2, "/v1/flights", {
      params: {
        origin: cities[0].code,
        destination: cities[1].code,
        "departure-date": departureDate,
        "return-date": returnDate
      }
    });
  });
  it("shows the 'Your Results' header", () => {
    expect(screen.getByText(/Your Results/i)).toBeInTheDocument();
  });
  it("shows the flight data", () => {
    expect(screen.getByText(flights[0].departingFlight.iata)).toBeInTheDocument();
    expect(screen.getByText(flights[0].returningFlight.iata)).toBeInTheDocument();
    expect(screen.getByText(flights[0].departingFlight.flightNo)).toBeInTheDocument();
    expect(screen.getByText(flights[0].returningFlight.flightNo)).toBeInTheDocument();
    expect(screen.getByText(`${flights[0].departingFlight.from.code} > ${flights[0].departingFlight.to.code}`))
      .toBeInTheDocument();
    expect(screen.getByText(`${flights[0].returningFlight.from.code} > ${flights[0].returningFlight.to.code}`))
      .toBeInTheDocument();
    expect(screen.getByText("Depart: 01:40pm")).toBeInTheDocument();
    expect(screen.getByText("Arrival: 03:10am")).toBeInTheDocument();
    expect(screen.getByText("Depart: 02:40pm")).toBeInTheDocument();
    expect(screen.getByText("Arrival: 04:10am")).toBeInTheDocument();
    expect(screen.getByText(`$${flights[0].departingFlight.price.amount}`)).toBeInTheDocument();
  });
});

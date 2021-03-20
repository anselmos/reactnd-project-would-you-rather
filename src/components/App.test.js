import { render, screen } from "@testing-library/react";
import App from "./App";
import store from "../store";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import React from "react";
describe("Testing App", () => {
  test("Renders loading app page", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    );
    const linkElement = screen.getByText(/Loading/i);
    expect(linkElement).toBeInTheDocument();
  });
});

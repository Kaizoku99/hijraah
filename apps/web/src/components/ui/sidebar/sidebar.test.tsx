import { render, screen } from "@testing-library/react";
import React from "react";

import { sidebar } from ".";

describe("sidebar Component", () => {
  it("renders correctly", () => {
    render(<sidebar>Test Content</sidebar>);
    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });
});

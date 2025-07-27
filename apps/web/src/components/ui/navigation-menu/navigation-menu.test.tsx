import { render, screen } from "@testing-library/react";
import React from "react";

import { NavigationMenu } from ".";

describe("NavigationMenu Component", () => {
  it("renders correctly", () => {
    render(<NavigationMenu>Test Content</NavigationMenu>);
    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });
});

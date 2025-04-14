import { vi } from "vitest";
import { render, screen } from "@testing-library/react";

import Select from "./Select";

describe("Select component", () => {
  const mockOnValueChange = vi.fn();
  const options = ["Option 1", "Option 2", "Option 3"];

  it("renders the Select component with placeholder", () => {
    render(
      <Select
        value=""
        onValueChange={mockOnValueChange}
        options={options}
        placeholder="Select an option"
      />
    );

    const selectTrigger = screen.getByTestId("select-trigger");
    expect(selectTrigger).toBeInTheDocument();
    expect(screen.getByTestId("select-value")).toHaveTextContent(
      "Select an option"
    );
  });

  it("displays the selected value", () => {
    render(
      <Select
        value="Option 2"
        onValueChange={mockOnValueChange}
        options={options}
        placeholder="Select an option"
      />
    );

    const selectValue = screen.getByTestId("select-value");
    expect(selectValue).toHaveTextContent("Option 2");
  });
});

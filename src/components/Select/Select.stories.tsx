/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";

import Select from "./Select";

const meta: Meta<typeof Select> = {
  title: "Components/Select",
  component: Select,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Select>;

const options = ["Option 1", "Option 2", "Option 3"];

export const WithValue: Story = {
  args: {
    options: options,
    placeholder: "Select an option",
  },
  render: (args) => {
    const [value, setValue] = useState<string>("Option 2");
    return (
      <Select
        {...args}
        value={value}
        onValueChange={(newValue) => setValue(newValue)}
      />
    );
  },
};

export const DarkMode: Story = {
  args: {
    options: options,
    placeholder: "Select an option",
  },
  parameters: {
    backgrounds: { default: "dark" },
    theme: "dark",
  },
  render: (args) => {
    const [value, setValue] = useState<string>("");
    return (
      <div className="dark p-4 bg-gray-800 dark">
        <Select
          {...args}
          value={value}
          onValueChange={(newValue) => setValue(newValue)}
        />
      </div>
    );
  },
};

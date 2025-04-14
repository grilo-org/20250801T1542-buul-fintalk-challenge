import { Meta, StoryObj } from "@storybook/react";
import Button from "./Button";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["primary", "secondary", "icon"],
    },
    children: { control: "text" },
    className: { control: "text" },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    variant: "primary",
    children: "Primary Button",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "Secondary Button",
  },
};

export const Icon: Story = {
  args: {
    variant: "icon",
    children: "🔍",
  },
};

export const CustomClassName: Story = {
  args: {
    variant: "primary",
    children: "Custom Class Button",
    className: "w-full md:w-auto",
  },
};

export const WithOnClick: Story = {
  args: {
    variant: "primary",
    children: "Click Me",
    onClick: () => alert("Button clicked!"),
  },
};

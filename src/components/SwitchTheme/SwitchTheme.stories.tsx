import type { Meta, StoryObj } from "@storybook/react";

import SwitchTheme from "./SwitchTheme";

const meta: Meta<typeof SwitchTheme> = {
  title: "Components/SwitchTheme",
  component: SwitchTheme,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof SwitchTheme>;

export const LightMode: Story = {
  parameters: {
    backgrounds: { default: "light" },
  },
};

export const DarkMode: Story = {
  parameters: {
    backgrounds: { default: "dark" },
  },
  decorators: [
    (Story) => (
      <div className="dark">
        <Story />
      </div>
    ),
  ],
};

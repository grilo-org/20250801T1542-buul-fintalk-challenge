import { Meta, StoryObj } from "@storybook/react";
import Avatar from "./Avatar";

const meta: Meta<typeof Avatar> = {
  title: "Components/Avatar",
  component: Avatar,
  argTypes: {
    title: { control: "text" },
    src: { control: "text" },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const WithImage: Story = {
  args: {
    title: "John Doe",
    src: "https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80",
  },
};

export const WithoutImage: Story = {
  args: {
    title: "John Doe",
  },
};

export const DarkMode: Story = {
  args: {
    title: "John Doe",
  },
  parameters: {
    backgrounds: { default: "dark" },
  },
};

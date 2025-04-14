import type { Meta, StoryObj } from "@storybook/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import Header from "./Header";
import userReducer from "../../flux/modules/user/reducers";
import { RequestStatus } from "../../models/iRequest";

// Create a mock store
const createTestStore = (initialState = {}) =>
  configureStore({
    reducer: {
      user: userReducer,
    },
    preloadedState: {
      user: {
        list: {
          data: [
            { id: 1, name: "John Doe", image: "john.jpg" },
            { id: 2, name: "Jane Smith", image: "jane.jpg" },
            { id: 3, name: "Bob Johnson", image: "bob.jpg" },
          ],
          status: RequestStatus.success,
        },
        selected: {
          data: null,
          status: RequestStatus.fetching,
        },
        ...initialState,
      },
    },
  });

const meta: Meta<typeof Header> = {
  title: "Components/Header",
  component: Header,
  decorators: [
    (Story, context) => (
      <Provider store={createTestStore(context.parameters.storeState)}>
        <Story />
      </Provider>
    ),
  ],
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Header>;

export const Default: Story = {
  parameters: {
    storeState: {
      selected: {
        data: { id: 2, name: "Jane Smith", image: "jane.jpg" },
        status: "succeeded",
      },
    },
  },
};

export const Desktop: Story = {
  parameters: {
    viewport: {
      defaultViewport: "desktop",
    },
  },
};

export const DarkMode: Story = {
  parameters: {
    backgrounds: { default: "dark" },
    storeState: {
      selected: {
        data: { id: 1, name: "John Doe", image: "john.jpg" },
        status: "succeeded",
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="dark">
        <Story />
      </div>
    ),
  ],
};

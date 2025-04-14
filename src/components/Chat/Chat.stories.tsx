import { Provider } from "react-redux";
import type { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { configureStore } from "@reduxjs/toolkit";

import Chat from "./Chat";
import userReducer from "../../flux/modules/user/reducers";
import { RequestStatus } from "../../models/iRequest";

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

const meta: Meta<typeof Chat> = {
  title: "Components/Chat",
  component: Chat,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story, context) => (
      <Provider store={createTestStore(context.parameters.storeState)}>
        <Story />
      </Provider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Chat>;

export const Default: Story = {
  args: {
    onClose: action("onClose"),
  },
};

export const DarkMode: Story = {
  args: {
    onClose: action("onClose"),
  },
  parameters: {
    backgrounds: { default: "dark" },
  },
  decorators: [
    (Story) => (
      <div
        className="dark"
        style={{ height: "600px", width: "400px", position: "relative" }}
      >
        <Story />
      </div>
    ),
  ],
};

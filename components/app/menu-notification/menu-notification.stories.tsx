import type { Meta, StoryObj } from "@storybook/nextjs";
import { fn } from "storybook/test";

import { MenuNotification } from "./menu-notification";

const FIGMA_URL =
  "https://www.figma.com/design/G9YNa2vjdqDjnML9y5hXJ4/%F0%9F%93%8C-GB_Design-System--Atom-?node-id=3555-8113";

const meta = {
  title: "App/MenuNotification",
  component: MenuNotification,
  tags: ["autodocs"],
  parameters: {
    design: {
      type: "figma",
      url: FIGMA_URL,
    },
  },
  decorators: [
    (Story) => (
      <div className="dark flex items-center gap-[var(--gb-spacing-2)] bg-[var(--gb-background-subtlest)] p-[var(--gb-spacing-4)]">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    type: {
      control: "select",
      options: ["icon", "text"],
    },
    status: {
      control: "select",
      options: ["default", "active", "disabled"],
    },
    showDot: { control: "boolean" },
  },
  args: {
    type: "text",
    status: "default",
    showDot: true,
    onClick: fn(),
  },
} satisfies Meta<typeof MenuNotification>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

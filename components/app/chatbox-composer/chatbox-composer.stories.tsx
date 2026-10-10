import type { Meta, StoryObj } from "@storybook/nextjs";
import { fn } from "storybook/test";

import { ChatboxComposer } from "./chatbox-composer";

const meta = {
  title: "App/ChatboxComposer",
  component: ChatboxComposer,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "image", "chip", "sentence-option"],
    },
    disabled: { control: "boolean" },
    placeholder: { control: "text" },
    defaultValue: { control: "text" },
    defaultImages: {
      control: "object",
      description: "variant 값과 무관하게 항상 표시됩니다.",
    },
    value: { control: false },
    images: { control: false },
  },
  args: {
    variant: "default",
    disabled: false,
    onValueChange: fn(),
    onAttach: fn(),
    onSend: fn(),
    onRemoveImage: fn(),
  },
} satisfies Meta<typeof ChatboxComposer>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

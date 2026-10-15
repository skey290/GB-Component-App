import type { Meta, StoryObj } from "@storybook/nextjs";
import { fn } from "storybook/test";

import { Onboarding } from "./onboarding";

const FIGMA_URL =
  "https://www.figma.com/design/Wp6AZNGqC4qf2Sz5zQ2PzQ/%F0%9F%93%8C-GB_UXUI--261002-?node-id=8135-128629";

const meta = {
  title: "App/Onboarding",
  component: Onboarding,
  tags: ["autodocs"],
  parameters: {
    design: {
      type: "figma",
      url: FIGMA_URL,
    },
  },
  argTypes: {
    onContinueWithGoogle: { control: false },
  },
  args: {
    onContinueWithGoogle: fn(),
  },
} satisfies Meta<typeof Onboarding>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

import type { Meta, StoryObj } from "@storybook/nextjs";
import { fn } from "storybook/test";

import {
  AssetHistoryDrawer,
  type AssetHistoryDrawerItem,
} from "./asset-history-drawer";

const FIGMA_URL =
  "https://www.figma.com/design/G9YNa2vjdqDjnML9y5hXJ4/%F0%9F%93%8C-GB_Design-System--Atom-?node-id=3365-461";

const selfArchiveItems: AssetHistoryDrawerItem[] = [
  { label: "Morning Jogger", selected: true, onRestore: fn(), onDelete: fn() },
  { label: "Workflow Sculptor", onRestore: fn(), onDelete: fn() },
  { label: "Sunday Baker", onRestore: fn(), onDelete: fn() },
  { label: "Vintage Curator", onRestore: fn(), onDelete: fn() },
  { label: "Brooklyn Observer", onRestore: fn(), onDelete: fn() },
];

const meta = {
  title: "App/AssetHistoryDrawer",
  component: AssetHistoryDrawer,
  tags: ["autodocs"],
  parameters: {
    design: {
      type: "figma",
      url: FIGMA_URL,
    },
  },
  decorators: [
    (Story) => (
      <div style={{ height: 500 }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    title: { control: "text" },
  },
  args: {
    title: "Self Archive",
    items: selfArchiveItems,
    onClose: fn(),
  },
} satisfies Meta<typeof AssetHistoryDrawer>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

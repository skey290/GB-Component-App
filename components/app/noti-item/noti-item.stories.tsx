import type { Meta, StoryObj } from "@storybook/nextjs";

import { NotiItem } from "./noti-item";

const FIGMA_URL =
  "https://www.figma.com/design/Wp6AZNGqC4qf2Sz5zQ2PzQ/%F0%9F%93%8C-GB_UXUI--261002-?node-id=8163-93036";

const meta = {
  title: "App/NotiItem",
  component: NotiItem,
  tags: ["autodocs"],
  parameters: {
    design: {
      type: "figma",
      url: FIGMA_URL,
    },
    // Figma 컴포넌트 description 필드 원문
    docs: {
      description: {
        component:
          "알림 드롭다운 리스트의 행 하나 — 메가폰 아이콘, 라벨, 읽지 않음 dot으로 구성된다. components/app/noti-item(NotiItem)으로 구현된다.",
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="dark w-[300px] bg-[var(--gb-background-overlay)] p-[var(--gb-spacing-1)]">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    label: { control: "text" },
    unread: { control: "boolean" },
  },
  args: {
    label: "New comment on your asset",
    unread: true,
  },
} satisfies Meta<typeof NotiItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

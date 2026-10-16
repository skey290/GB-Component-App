import type { Meta, StoryObj } from "@storybook/nextjs";
import { Home } from "lucide-react";
import { fn } from "storybook/test";

import { MenuButton } from "./menu-button";

const FIGMA_URL =
  "https://www.figma.com/design/Wp6AZNGqC4qf2Sz5zQ2PzQ/%F0%9F%93%8C-GB_UXUI--261002-?node-id=8163-93014";

const meta = {
  title: "App/MenuButton",
  component: MenuButton,
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
          "GNB 내비게이션 행 하나 — 아이콘만/아이콘+라벨/라벨만 중 하나이며, default/active/disabled 상태를 가진다. components/app/menu-button(MenuButton)으로 구현된다.",
      },
    },
  },
  // GNB(사이드바)는 항상 다크로 렌더링되므로(Figma 실측), 스토리도 다크 배경 위에서 확인합니다.
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
      options: ["icon", "icon-with-text", "text"],
    },
    status: {
      control: "select",
      options: ["default", "active", "disabled"],
    },
    label: { control: "text" },
  },
  args: {
    type: "icon-with-text",
    status: "default",
    icon: Home,
    label: "Dashboard",
    onClick: fn(),
  },
} satisfies Meta<typeof MenuButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

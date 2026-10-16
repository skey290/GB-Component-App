import * as React from "react";
import type { Meta, StoryObj } from "@storybook/nextjs";
import { fn } from "storybook/test";

import { NotiDropdown, type NotiDropdownProps } from "./noti-dropdown";

const FIGMA_URL =
  "https://www.figma.com/design/Wp6AZNGqC4qf2Sz5zQ2PzQ/%F0%9F%93%8C-GB_UXUI--261002-?node-id=8163-93051";

const items = [
  { id: "1", label: "notification placeholder", unread: true },
  { id: "2", label: "notification placeholder", unread: true },
  { id: "3", label: "notification placeholder", unread: true },
  { id: "4", label: "notification placeholder" },
  { id: "5", label: "notification placeholder" },
];

// 완전 제어 컴포넌트라, Controls에서 selectedTab을 바꿔도 탭 클릭으로 실제 전환을
// 확인할 수 있도록 내부 상태를 들고 있는다.
function ControlledNotiDropdown({
  selectedTab,
  onSelectedTabChange,
  ...rest
}: NotiDropdownProps) {
  const [tab, setTab] = React.useState(selectedTab);

  React.useEffect(() => setTab(selectedTab), [selectedTab]);

  return (
    <NotiDropdown
      {...rest}
      selectedTab={tab}
      onSelectedTabChange={(next) => {
        setTab(next);
        onSelectedTabChange?.(next);
      }}
    />
  );
}

const meta = {
  title: "App/NotiDropdown",
  component: NotiDropdown,
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
          "GNB 벨 아이콘을 클릭하면 열리는 알림 드롭다운 패널 — All/Unread 탭과 스크롤 가능한 항목 리스트로 구성된다. components/app/noti-dropdown(NotiDropdown)으로 구현된다.",
      },
    },
  },
  argTypes: {
    selectedTab: {
      control: "radio",
      options: ["all", "unread"],
    },
  },
  args: {
    items,
    selectedTab: "all",
    onSettingsClick: fn(),
  },
  render: (args) => <ControlledNotiDropdown {...args} />,
} satisfies Meta<typeof NotiDropdown>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

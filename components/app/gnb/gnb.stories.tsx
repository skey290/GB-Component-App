import * as React from "react";
import type { Meta, StoryObj } from "@storybook/nextjs";
import { Blocks, Compass, Home, UserRoundSearch } from "lucide-react";
import { fn } from "storybook/test";

import { Gnb, type GnbItem, type GnbProps } from "./gnb";
import { createSpriteIcon } from "@/lib/sprite-icon";
import type { NotiDropdownItem } from "@/components/app/noti-dropdown";
import type { GnbHistoryItem } from "./gnb";

const FIGMA_URL =
  "https://www.figma.com/design/Wp6AZNGqC4qf2Sz5zQ2PzQ/%F0%9F%93%8C-GB_UXUI--261002-?node-id=8163-93080";

// Assets는 /public/icons.svg 커스텀 벡터, 나머지는 lucide 표준 아이콘.
const AssetIcon = createSpriteIcon("asset-icon");

const items: GnbItem[] = [
  { id: "dashboard", icon: Home, label: "Dashboard" },
  { id: "assets", icon: AssetIcon, label: "Assets" },
  { id: "compass", icon: Compass, label: "Compass" },
  { id: "contents-studio", icon: Blocks, label: "Contents Studio" },
  { id: "know-thyself", icon: UserRoundSearch, label: "Know Thyself" },
];

const notificationItems: NotiDropdownItem[] = [
  { id: "1", label: "notification placeholder", unread: true },
  { id: "2", label: "notification placeholder", unread: true },
  { id: "3", label: "notification placeholder" },
];

const workHistoryItems: GnbHistoryItem[] = [
  { label: "Profile photo", badge: "Data Scientist", timestamp: "Just now", onRestore: () => {} },
  { label: "Bio", badge: "Data Scientist", timestamp: "20min ago", onRestore: () => {} },
];

const selfArchiveItems: GnbHistoryItem[] = [
  { label: "Morning Jogger", onRestore: () => {}, onDelete: () => {} },
  { label: "Weekend Chef", onRestore: () => {}, onDelete: () => {} },
];

function ControlledGnb(props: GnbProps) {
  const [expanded, setExpanded] = React.useState(props.expanded);
  const [activeId, setActiveId] = React.useState(props.activeId);

  // Controls 패널에서 expanded/activeId를 바꿔도 반영되도록 동기화
  // (클릭으로 바뀐 내부 상태는 그대로 유지하고, args 변경 시에만 따라감)
  React.useEffect(() => setExpanded(props.expanded), [props.expanded]);
  React.useEffect(() => setActiveId(props.activeId), [props.activeId]);

  return (
    <div style={{ height: 700 }}>
      <Gnb
        {...props}
        expanded={expanded}
        onExpandedChange={(next) => {
          setExpanded(next);
          props.onExpandedChange?.(next);
        }}
        activeId={activeId}
        onItemSelect={(id) => {
          setActiveId(id);
          props.onItemSelect?.(id);
        }}
      />
    </div>
  );
}

const meta = {
  title: "App/Gnb",
  component: Gnb,
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
          "메인 사이드바. 접힌 아이콘 레일(토글/벨/설정/내비게이션 아이콘)은 범용 Button 컴포넌트를 재사용하고, 펼친 라벨 목록은 Part/GNB 행을 재사용한다. components/app/gnb(Gnb)로 구현된다. Work History/Self Archive 드로어가 열렸을 때 레일-패널 사이 간격은 0px(완전 플러시)이며, 토글은 현재 보이는 패널 전체 폭(레일 48px/250px + 드로어 407px) + 20px 위치에 고정된다. Settings 클릭 시에는 레일 옆에 Setting 패널(검색창 + 메뉴 6행)이 열리고, 그동안 메인 내비게이션의 활성 표시는 꺼진다.",
      },
    },
  },
  argTypes: {
    expanded: { control: "boolean" },
    unreadCount: { control: "number" },
  },
  args: {
    items,
    expanded: true,
    activeId: "dashboard",
    disabledIds: [],
    unreadCount: 2,
    notificationItems,
    workHistoryItems,
    selfArchiveItems,
    onItemSelect: fn(),
    onExpandedChange: fn(),
    onSettingsClick: fn(),
    onToggleNotification: fn(),
    onNotificationSettingsClick: fn(),
    onSettingSectionSelect: fn(),
    onSettingSearchChange: fn(),
  },
  render: (args) => <ControlledGnb {...args} />,
} satisfies Meta<typeof Gnb>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

import * as React from "react";
import type { Meta, StoryObj } from "@storybook/nextjs";
import { Blocks, Compass, Home, UserSearch } from "lucide-react";
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
  { id: "know-thyself", icon: UserSearch, label: "Know Thyself" },
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
  },
  render: (args) => <ControlledGnb {...args} />,
} satisfies Meta<typeof Gnb>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

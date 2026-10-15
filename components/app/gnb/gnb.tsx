"use client";

import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import {
  type LucideIcon,
  Bell,
  PanelLeftClose as PanelLeftCloseIcon,
  PanelLeftOpen as PanelLeftOpenIcon,
  Settings as SettingsIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { createSpriteIcon } from "@/lib/sprite-icon";
import { MenuButton } from "@/components/app/menu-button";
import {
  NotiDropdown,
  type NotiDropdownItem,
} from "@/components/app/noti-dropdown";

/** Figma `dot-bell-icon` — 벨+읽지 않음 점이 하나로 합쳐진 단일 에셋 */
const DotBellIcon = createSpriteIcon("dot-bell-icon");

/**
 * 메인 사이드바. Expand/Type/Style 세 축을 "activeId 하나 + disabledIds 목록"
 * 으로 축약했습니다(ButtonGroup과 동일한 패턴). 로고는 `/public/images/logo.png` 에셋을 사용합니다.
 *
 * 알림벨/Settings/네비게이션 항목 전부 `MenuButton` 하나로 조합합니다 — Figma
 * 구조상 알림벨도 Part/GNB(펼침)·Button(접힘) 패턴을 그대로 따르는 네비 항목일
 * 뿐, 별도 컴포넌트가 아닙니다. 읽지 않음 여부만 아이콘 자체를 `dot-bell-icon`
 * (벨+점 단일 에셋)과 순수 `Bell`로 바꿔 표현합니다. 알림 드롭다운은 벨
 * 아이콘에 앵커된 Radix Popover(`NotiDropdown`)로 구현합니다. Settings 클릭은
 * 콜백만 노출하고 플라이아웃 패널 구현은 후속 작업입니다.
 *
 * GNB 계열(MenuButton/NotiDropdown 포함)은 Figma 실측상 항상 다크로
 * 렌더링됩니다(`--background-subtlest` 등 시맨틱 토큰의 다크값과 스크린샷이
 * 일치) — Popover/Chatbox와 동일한 `.dark` 스코프 트릭을 루트에 적용합니다.
 */
export interface GnbItem {
  id: string;
  icon: LucideIcon;
  label: string;
}

export interface GnbProps {
  /** 사이드바 확장 여부 (Figma `Expand` variant) */
  expanded: boolean;
  onExpandedChange?: (expanded: boolean) => void;
  /** 네비게이션 항목 목록 (Figma의 Dashboard/Assets/Compass/Contents Studio/Know Thyself) */
  items: GnbItem[];
  /** 현재 활성 항목 id */
  activeId: string;
  /** 개별적으로 비활성화된 항목 id 목록 (Figma `Style=disabled`) */
  disabledIds?: string[];
  onItemSelect?: (id: string) => void;
  /** 알림 벨의 읽지 않음 dot 표시 여부를 결정 (0이면 dot 숨김) */
  unreadCount?: number;
  /** 알림 드롭다운(`NotiDropdown`)에 전달할 항목 목록 */
  notificationItems?: NotiDropdownItem[];
  onToggleNotification?: (open: boolean) => void;
  onNotificationSettingsClick?: () => void;
  /** Settings 메뉴 클릭 콜백 (플라이아웃 패널은 후속 작업) */
  onSettingsClick?: () => void;
  className?: string;
}

export function Gnb({
  expanded,
  onExpandedChange,
  items,
  activeId,
  disabledIds = [],
  onItemSelect,
  unreadCount = 0,
  notificationItems = [],
  onToggleNotification,
  onNotificationSettingsClick,
  onSettingsClick,
  className,
}: GnbProps) {
  const [notificationOpen, setNotificationOpen] = React.useState(false);
  const menuType = expanded ? "icon-with-text" : "icon";

  const handleNotificationOpenChange = (open: boolean) => {
    setNotificationOpen(open);
    onToggleNotification?.(open);
  };

  return (
    <div
      className={cn(
        "dark flex h-full flex-col gap-[var(--gb-spacing-2-5)] overflow-hidden",
        "bg-[var(--gb-background-subtlest)] px-[var(--gb-spacing-2)] py-[var(--gb-spacing-5)]",
        "transition-[width] duration-200 ease-linear",
        expanded
          ? // Figma 확정값 250px
            "w-[250px] items-start"
          : "w-[48px] items-center",
        className,
      )}
    >
      <div className="flex w-full items-center gap-[var(--gb-spacing-3)] overflow-hidden">
        <MenuButton
          type="icon"
          icon={expanded ? PanelLeftCloseIcon : PanelLeftOpenIcon}
          aria-label={expanded ? "Collapse sidebar" : "Expand sidebar"}
          onClick={() => onExpandedChange?.(!expanded)}
          className="shrink-0"
        />
        <img
          src="/images/logo.png"
          alt="Gabrielle"
          aria-hidden={expanded ? undefined : "true"}
          className={cn(
            "h-[var(--gb-spacing-5)] w-auto shrink-0",
            "transition-opacity duration-150 ease-out",
            expanded ? "opacity-100" : "opacity-0",
          )}
        />
      </div>

      <PopoverPrimitive.Root
        open={notificationOpen}
        onOpenChange={handleNotificationOpenChange}
      >
        <PopoverPrimitive.Trigger asChild>
          <MenuButton
            type={menuType}
            icon={unreadCount > 0 ? DotBellIcon : Bell}
            label="Notification"
            status={notificationOpen ? "active" : "default"}
            aria-label={expanded ? undefined : "Notification"}
            className="w-full"
          />
        </PopoverPrimitive.Trigger>
        <PopoverPrimitive.Portal>
          <PopoverPrimitive.Content
            side="bottom"
            align="start"
            sideOffset={8}
            className="z-50"
          >
            <NotiDropdown
              items={notificationItems}
              onSettingsClick={onNotificationSettingsClick}
            />
          </PopoverPrimitive.Content>
        </PopoverPrimitive.Portal>
      </PopoverPrimitive.Root>

      <MenuButton
        type={menuType}
        icon={SettingsIcon}
        label="Settings"
        aria-label={expanded ? undefined : "Settings"}
        onClick={onSettingsClick}
        className="w-full"
      />

      <div role="separator" className="h-[8px] w-full">
        <div className="mt-[4px] h-[length:var(--gb-border-1)] w-full bg-[var(--gb-border-default)]" />
      </div>

      <nav
        aria-label="Main"
        className="flex w-full flex-1 flex-col gap-[var(--gb-spacing-2-5)] overflow-y-auto"
      >
        {items.map((item) => {
          const isDisabled = disabledIds.includes(item.id);
          const isActive = !isDisabled && item.id === activeId;

          return (
            <MenuButton
              key={item.id}
              type={menuType}
              icon={item.icon}
              label={item.label}
              aria-label={expanded ? undefined : item.label}
              status={isDisabled ? "disabled" : isActive ? "active" : "default"}
              onClick={() => onItemSelect?.(item.id)}
              className="w-full"
            />
          );
        })}
      </nav>
    </div>
  );
}

"use client";

import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import {
  type LucideIcon,
  Archive,
  Bell,
  History,
  RotateCcw,
  Trash2,
  X,
  PanelLeftClose as PanelLeftCloseIcon,
  PanelLeftOpen as PanelLeftOpenIcon,
  Settings as SettingsIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { createSpriteIcon } from "@/lib/sprite-icon";
import { MenuButton } from "@/components/app/menu-button";
import { Toggle } from "@/components/ui/toggle";
import { Badge } from "@/components/ui/badge";
import {
  NotiDropdown,
  type NotiDropdownItem,
} from "@/components/app/noti-dropdown";

/** Figma `dot-bell-icon` — 벨+읽지 않음 점이 하나로 합쳐진 단일 에셋 */
const DotBellIcon = createSpriteIcon("dot-bell-icon");

/** Work History/Self Archive 드로어 리스트 항목 하나 */
export interface GnbHistoryItem {
  label: string;
  /** 있으면 Work History 스타일 행(배지+라벨+타임스탬프)으로 렌더링됩니다 */
  badge?: string;
  /** 있으면 Work History 스타일 행으로 렌더링됩니다 */
  timestamp?: string;
  onRestore?: () => void;
  /** Self Archive 스타일 행에서만 사용(Work History에는 삭제 버튼이 없음) */
  onDelete?: () => void;
  /** Self Archive 스타일 행에서만 사용 — 현재 선택된 항목 하이라이트(Figma 확정값) */
  selected?: boolean;
}

const historyIconButtonClass = cn(
  "inline-flex shrink-0 items-center justify-center rounded-[var(--gb-radius-scale-full)]",
  "text-[var(--gb-icon-default)] outline-none transition-colors",
  "hover:text-[var(--gb-icon-subtlest)] focus-visible:shadow-[var(--gb-shadow-focus-ring)]",
);

/**
 * Work History/Self Archive 패널 — Figma상 GNB 컴포넌트셋 자신의 `Type` variant로,
 * `Notfication`(알림)과 달리 별도 컴포넌트를 인스턴싱하지 않고 범용 atom(Button/
 * Badge/아이콘)만으로 GNB 안에 직접 그려진다. 그래서 `NotiDropdown`과 달리
 * 독립 컴포넌트로 분리하지 않고 `Gnb` 내부에 그대로 둔다.
 */
function GnbHistoryPanel({
  title,
  items,
  onClose,
}: {
  title: string;
  items: GnbHistoryItem[];
  onClose: () => void;
}) {
  return (
    <div
      className={cn(
        "dark flex h-full flex-col items-start gap-[var(--gb-spacing-4)]",
        "w-[407px] bg-[var(--gb-background-subtler)]",
        "py-[var(--gb-spacing-6)] pr-[var(--gb-spacing-2)] pl-[var(--gb-spacing-7)]",
      )}
    >
      <div className="flex w-full items-center justify-between pr-[var(--gb-spacing-6)]">
        <h2 className="truncate text-base-semi-bold text-[var(--gb-text-bold)]">
          {title}
        </h2>
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          className={cn(historyIconButtonClass, "size-[28px]")}
        >
          <X aria-hidden="true" className="size-[var(--gb-spacing-4)]" />
        </button>
      </div>
      <ul className="flex w-full flex-1 flex-col items-start gap-[var(--gb-spacing-2)] overflow-y-auto pr-[var(--gb-spacing-5)]">
        {items.map((item, index) => {
          const isHistoryStyle =
            item.badge !== undefined || item.timestamp !== undefined;

          return (
            <li key={`${item.label}-${index}`} className="w-full shrink-0">
              {isHistoryStyle ? (
                <div className="flex w-full items-center gap-[var(--gb-spacing-2)] rounded-[var(--gb-radius-scale-2xl)]">
                  {item.badge ? (
                    <Badge variant="outline">{item.badge}</Badge>
                  ) : null}
                  <span className="min-w-0 flex-1 truncate text-xs-medium text-[var(--gb-text-bold)]">
                    {item.label}
                  </span>
                  {item.timestamp ? (
                    <span className="shrink-0 text-xs-medium whitespace-nowrap text-[var(--gb-text-subtle)]">
                      {item.timestamp}
                    </span>
                  ) : null}
                  {item.onRestore ? (
                    <button
                      type="button"
                      aria-label="Restore"
                      onClick={item.onRestore}
                      className={cn(historyIconButtonClass, "size-[36px]")}
                    >
                      <History
                        aria-hidden="true"
                        className="size-[var(--gb-spacing-4)]"
                      />
                    </button>
                  ) : null}
                </div>
              ) : (
                <div
                  className={cn(
                    "flex h-[var(--gb-spacing-8)] w-full items-center gap-[var(--gb-spacing-1)]",
                    "rounded-[var(--gb-radius-scale-sm)] pr-[var(--gb-spacing-1)] pl-[var(--gb-spacing-2)]",
                    item.selected && "bg-[var(--gb-background-selected)]",
                  )}
                >
                  <span className="min-w-0 flex-1 truncate text-sm-regular text-[var(--gb-text-default)]">
                    {item.label}
                  </span>
                  {item.onRestore ? (
                    <button
                      type="button"
                      aria-label="Restore"
                      onClick={item.onRestore}
                      className={cn(historyIconButtonClass, "size-[28px]")}
                    >
                      <RotateCcw
                        aria-hidden="true"
                        className="size-[var(--gb-spacing-4)]"
                      />
                    </button>
                  ) : null}
                  {item.onDelete ? (
                    <button
                      type="button"
                      aria-label="Delete"
                      onClick={item.onDelete}
                      className={cn(historyIconButtonClass, "size-[28px]")}
                    >
                      <Trash2
                        aria-hidden="true"
                        className="size-[var(--gb-spacing-4)]"
                      />
                    </button>
                  ) : null}
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

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
  /** Work History 드로어에 전달할 항목 목록 */
  workHistoryItems?: GnbHistoryItem[];
  /** Self Archive 드로어에 전달할 항목 목록 */
  selfArchiveItems?: GnbHistoryItem[];
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
  workHistoryItems = [],
  selfArchiveItems = [],
  className,
}: GnbProps) {
  const [notificationOpen, setNotificationOpen] = React.useState(false);
  const [activeDrawer, setActiveDrawer] = React.useState<
    "work-history" | "self-archive" | null
  >(null);
  const menuType = expanded ? "icon-with-text" : "icon";

  // Figma 실측: 토글은 "현재 보이는 패널 전체 폭(레일 48/250px + 열려있으면 드로어
  // 407px) + 20px" 위치에 고정된다 — 레일-패널 사이는 0px(완전 플러시)이고, 20px
  // 간격은 패널과 토글 사이의 것이다.
  const railWidth = expanded ? 250 : 48;
  const toggleLeft = railWidth + (activeDrawer ? 407 : 0) + 20;

  const toggleDrawer = (drawer: "work-history" | "self-archive") => {
    setActiveDrawer((prev) => (prev === drawer ? null : drawer));
  };

  const handleNotificationOpenChange = (open: boolean) => {
    setNotificationOpen(open);
    onToggleNotification?.(open);
  };

  return (
    <div className="relative inline-flex h-full">
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

      {/* Work History/Self Archive 트리거 — GNB 패널 바깥 우측에 독립적으로 떠
          있는 2연 세그먼트(`Toggle`). 메인 패널이 overflow-hidden이라 그 안에
          두면 패널 박스 밖으로 나온 부분이 잘려서, 바깥 래퍼 기준 절대위치로
          둔다(left는 위에서 계산한 toggleLeft — 레일 폭 + 드로어가 열려있으면
          패널 폭까지 더해 항상 현재 보이는 패널 바로 옆 20px에 붙는다). 둘 다
          닫힘에서 시작, 누른 쪽만 열리고 같은 걸 다시 누르면 닫힌다(상호 배타 +
          재클릭 닫기는 selectionMode로 표현이 안 돼 activeDrawer 상태로 직접
          제어). */}
      <Toggle
        type="icon"
        selectionMode="multiple"
        className="absolute top-[20px] z-20"
        style={{ left: `${toggleLeft}px` }}
        items={[
          {
            icon: <History aria-hidden="true" className="size-full" />,
            "aria-label": "Work history",
            pressed: activeDrawer === "work-history",
            onPressedChange: () => toggleDrawer("work-history"),
          },
          {
            icon: <Archive aria-hidden="true" className="size-full" />,
            "aria-label": "Self archive",
            pressed: activeDrawer === "self-archive",
            onPressedChange: () => toggleDrawer("self-archive"),
          },
        ]}
      />

      {/* Work History/Self Archive 패널 — Figma상 GNB 자신의 variant라, 별도
          오버레이가 아니라 GNB 본체와 나란한 flex 형제로 붙여 전체 폭이 함께
          넓어지게 한다. */}
      {activeDrawer && (
        <GnbHistoryPanel
          title={activeDrawer === "work-history" ? "Work History" : "Self Archive"}
          items={activeDrawer === "work-history" ? workHistoryItems : selfArchiveItems}
          onClose={() => setActiveDrawer(null)}
        />
      )}
    </div>
  );
}

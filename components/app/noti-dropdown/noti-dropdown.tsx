"use client";

import * as React from "react";
import { Settings } from "lucide-react";

import { cn } from "@/lib/utils";
import { Tabs } from "@/components/ui/tabs";
import { NotiItem } from "@/components/app/noti-item";

/**
 * GNB 알림벨(`MenuNotification`) 클릭 시 뜨는 드롭다운 패널. 헤더의
 * All/Unread 탭과 카운트 배지는 `Tabs`/`Badge`를 그대로 재사용합니다.
 *
 * 항상 다크(GNB 계열 공통 — Chatbox/Popover와 동일한 패턴).
 */
export interface NotiDropdownItem {
  id: string;
  label: string;
  /** true면 우측에 4px 빨간 dot이 표시되고(Figma `Type=new`), "Unread" 탭에도 노출됩니다 */
  unread?: boolean;
}

export interface NotiDropdownProps {
  items: NotiDropdownItem[];
  /** 현재 선택된 탭 (완전 제어형) */
  selectedTab?: "all" | "unread";
  onSelectedTabChange?: (tab: "all" | "unread") => void;
  onSettingsClick?: () => void;
  className?: string;
}
const LIST_MAX_HEIGHT_CLASS =
  "max-h-[calc((var(--gb-spacing-8)*6)+(var(--gb-spacing-2)*5)+(var(--gb-spacing-1)*2))]";
const SCROLLBAR_TRACK_HEIGHT_CLASS =
  "h-[calc((var(--gb-spacing-8)*6)+(var(--gb-spacing-2)*5)+(var(--gb-spacing-1)*2))]";

export function NotiDropdown({
  items,
  selectedTab = "all",
  onSelectedTabChange,
  onSettingsClick,
  className,
}: NotiDropdownProps) {
  const [thumb, setThumb] = React.useState({ top: 0, height: 100 });
  const listRef = React.useRef<HTMLUListElement>(null);

  const unreadCount = items.filter((item) => item.unread).length;
  const visibleItems =
    selectedTab === "unread" ? items.filter((item) => item.unread) : items;
  const isScrollable = visibleItems.length > 6;

  const updateThumb = React.useCallback(() => {
    const list = listRef.current;
    if (!list) return;
    const { scrollTop, scrollHeight, clientHeight } = list;
    if (scrollHeight <= clientHeight) {
      setThumb({ top: 0, height: 100 });
      return;
    }
    const heightPercent = (clientHeight / scrollHeight) * 100;
    const topPercent =
      (scrollTop / (scrollHeight - clientHeight)) * (100 - heightPercent);
    setThumb({ top: topPercent, height: heightPercent });
  }, []);

  const listCallbackRef = React.useCallback(
    (node: HTMLUListElement | null) => {
      listRef.current = node;
      if (node) updateThumb();
    },
    [updateThumb],
  );

  return (
    <div
      className={cn(
        "dark flex w-[300px] flex-col items-start gap-[var(--gb-spacing-2)]",
        "rounded-[var(--gb-radius-scale-md)] border-[length:var(--gb-border-1)] border-[var(--gb-border-default)] border-solid",
        "bg-[var(--gb-background-overlay)] py-[var(--gb-spacing-1)]",
        // 디자인 그림자와 정확히 일치하는 토큰이 없어 가장 가까운 값으로 근사한다.
        "shadow-[var(--gb-shadow-md)]",
        className,
      )}
    >
      <div className="flex w-full items-center px-[var(--gb-spacing-2)]">
        <Tabs
          items={[
            { label: "All", count: items.length },
            { label: "Unread", count: unreadCount },
          ]}
          selectedIndex={selectedTab === "unread" ? 1 : 0}
          onSelectedIndexChange={(index) =>
            onSelectedTabChange?.(index === 1 ? "unread" : "all")
          }
          className="min-w-0 flex-1 border-b-[color:var(--gb-border-static-gray)] [&>button]:flex-1"
        />
        <button
          type="button"
          aria-label="Notification settings"
          onClick={onSettingsClick}
          className={cn(
            "inline-flex size-[36px] shrink-0 items-center justify-center",
            "rounded-[var(--gb-radius-scale-full)] text-[var(--gb-icon-default)]",
            "outline-none transition-colors",
            "hover:text-[var(--gb-icon-subtlest)] focus-visible:shadow-[var(--gb-shadow-focus-ring)]",
          )}
        >
          <Settings aria-hidden="true" className="size-[var(--gb-spacing-4)]" />
        </button>
      </div>
      <div className="flex w-full items-stretch">
        <ul
          ref={listCallbackRef}
          onScroll={updateThumb}
          className={cn(
            "flex min-w-0 flex-1 flex-col items-start gap-[var(--gb-spacing-2)] overflow-y-auto p-[var(--gb-spacing-1)]",
            "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
            LIST_MAX_HEIGHT_CLASS,
          )}
        >
          {visibleItems.map((item) => (
            <li key={item.id} className="w-full shrink-0">
              <NotiItem label={item.label} unread={item.unread} />
            </li>
          ))}
        </ul>
        {isScrollable ? (
          <div
            aria-hidden="true"
            className="shrink-0 py-[var(--gb-spacing-1)] pr-[var(--gb-spacing-1)]"
          >
            <div
              className={cn(
                "relative w-[10px] rounded-[var(--gb-radius-scale-full)] bg-[var(--gb-background-subtler)]",
                SCROLLBAR_TRACK_HEIGHT_CLASS,
              )}
            >
              <div
                className="absolute inset-x-0 rounded-[var(--gb-radius-scale-full)] bg-[var(--gb-background-subtle)]"
                style={{ top: `${thumb.top}%`, height: `${thumb.height}%` }}
              />
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

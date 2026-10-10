"use client";

import * as React from "react";
import { History, RotateCcw, Trash2, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

/**
 * GNB Assets 옆에 뜨는 407px 폭 이력 드로어. 두 행 레이아웃이 달라
 * (Work History: 배지+라벨+타임스탬프+되돌리기 1개 / Self Archive: 라벨+되돌리기+
 * 삭제 2개, 선택 행 하이라이트) `badge`/`timestamp` 존재 여부로 두 스타일을
 * 판별합니다: 하나라도 있으면 Work History 행, 둘 다 없으면 Self Archive 행으로
 * 렌더링합니다.
 */
export interface AssetHistoryDrawerItem {
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

export interface AssetHistoryDrawerProps {
  title: string;
  items: AssetHistoryDrawerItem[];
  onClose?: () => void;
  className?: string;
}

const iconButtonClass = cn(
  "inline-flex shrink-0 items-center justify-center rounded-[var(--gb-radius-scale-full)]",
  "text-[var(--gb-icon-default)] outline-none transition-colors",
  "hover:text-[var(--gb-icon-subtlest)] focus-visible:shadow-[var(--gb-shadow-focus-ring)]",
);

export function AssetHistoryDrawer({
  title,
  items,
  onClose,
  className,
}: AssetHistoryDrawerProps) {
  return (
    <div
      className={cn(
        "dark flex h-full flex-col items-start gap-[var(--gb-spacing-4)]",
        // Figma 확정값 407px
        "w-[407px] bg-[var(--gb-background-subtler)]",
        "py-[var(--gb-spacing-6)] pr-[var(--gb-spacing-2)] pl-[var(--gb-spacing-7)]",
        className,
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
          className={cn(iconButtonClass, "size-[28px]")}
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
                      className={cn(
                        iconButtonClass,
                        "size-[36px]",
                      )}
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
                      className={cn(
                        iconButtonClass,
                        "size-[28px]",
                      )}
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
                      className={cn(
                        iconButtonClass,
                        "size-[28px]",
                      )}
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

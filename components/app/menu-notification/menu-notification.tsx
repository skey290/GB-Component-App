"use client";

import * as React from "react";
import { Bell } from "lucide-react";

import { cn } from "@/lib/utils";
import { createSpriteIcon } from "@/lib/sprite-icon";

/** Figma `dot-bell-icon` — 벨+읽지 않음 점이 하나로 합쳐진 단일 에셋 */
const DotBellIcon = createSpriteIcon("dot-bell-icon");

/**
 * GNB의 알림벨 트리거. `type`은 icon/text, `status`는 default/active/disabled.
 *
 * 읽지 않음 표시가 있을 때는 Figma 원본과 동일하게 벨+점이 하나로 합쳐진
 * `dot-bell-icon` 에셋을 쓰고, 없을 때(Figma엔 없는 상태)는 순수 `Bell` 아이콘을
 * 씁니다 — `showDot`으로 개별 제어 가능하고, disabled에는 항상 숨겨집니다.
 *
 * 라벨은 항상 마운트해두고 opacity만 트랜지션한다 — 폭은 GNB 루트의 width
 * 트랜지션을 따라 버튼 자체가 overflow-hidden으로 가린다(`MenuButton`과 동일).
 */
export interface MenuNotificationProps extends Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "type" | "disabled"
> {
  /** Figma `Type` variant */
  type?: "icon" | "text";
  /** Figma `Status` variant. disabled 상태는 여기 하나로만 표현 — 네이티브 `disabled` prop은 따로 받지 않음. */
  status?: "default" | "active" | "disabled";
  /** `type="text"`에서 렌더링할 라벨 */
  label?: string;
  /** 읽지 않은 알림 dot 표시 여부 (기본값: status가 disabled가 아니면 true) */
  showDot?: boolean;
}

export const MenuNotification = React.forwardRef<
  HTMLButtonElement,
  MenuNotificationProps
>(function MenuNotification(
  {
    type = "icon",
    status = "default",
    label = "Notification",
    showDot = true,
    className,
    "aria-label": ariaLabel,
    ...props
  },
  ref,
) {
  const isActive = status === "active";
  const isDisabled = status === "disabled";
  const displayDot = showDot && !isDisabled;

  return (
    <button
      ref={ref}
      type="button"
      disabled={isDisabled}
      aria-current={isActive ? "true" : undefined}
      aria-label={ariaLabel ?? (type === "icon" ? label : undefined)}
      className={cn(
        "inline-flex items-center overflow-hidden outline-none transition-colors",
        "focus-visible:shadow-[var(--gb-shadow-focus-ring)]",
        "disabled:pointer-events-none disabled:cursor-not-allowed",
        label && "gap-[var(--gb-spacing-3)]",
        className,
      )}
      {...props}
    >
      <span
        className={cn(
          "relative inline-flex shrink-0 items-center justify-center",
          "size-[var(--gb-spacing-8)] rounded-[var(--gb-radius-scale-md)]",
          isActive && "bg-[var(--gb-background-mute)]",
        )}
      >
        {displayDot ? (
          <DotBellIcon
            aria-hidden="true"
            data-testid="menu-notification-icon"
            data-dot="true"
            className={cn(
              "size-[var(--gb-spacing-4)]",
              isDisabled
                ? "text-[var(--gb-icon-static-gray)]"
                : isActive
                  ? "text-[var(--gb-icon-static-white)]"
                  : "text-[var(--gb-icon-subtle)]",
            )}
          />
        ) : (
          <Bell
            aria-hidden="true"
            data-testid="menu-notification-icon"
            className={cn(
              "size-[var(--gb-spacing-4)]",
              isDisabled
                ? "text-[var(--gb-icon-static-gray)]"
                : isActive
                  ? "text-[var(--gb-icon-static-white)]"
                  : "text-[var(--gb-icon-subtle)]",
            )}
          />
        )}
      </span>
      {label ? (
        <span
          aria-hidden={type === "text" ? undefined : "true"}
          className={cn(
            "min-w-0 truncate whitespace-nowrap transition-opacity duration-150 ease-out",
            type === "text" ? "opacity-100" : "opacity-0",
            isDisabled
              ? "text-base-medium text-[var(--gb-text-static-gray)]"
              : isActive
                ? "text-base-semi-bold text-[var(--gb-text-bold)]"
                : "text-base-medium text-[var(--gb-text-subtle)]",
          )}
        >
          {label}
        </span>
      ) : null}
    </button>
  );
});

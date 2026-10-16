"use client";

import * as React from "react";
import { Megaphone } from "lucide-react";

import { cn } from "@/lib/utils";

/** 알림 드롭다운(`NotiDropdown`)의 리스트 항목 하나 (Figma `Part/Notification`). */
export interface NotiItemProps {
  /** 알림 라벨 텍스트 */
  label: string;
  /** Figma `Type=new` — true면 우측에 4px 빨간 dot 표시 */
  unread?: boolean;
  onClick?: () => void;
  className?: string;
}

export function NotiItem({
  label,
  unread = false,
  onClick,
  className,
}: NotiItemProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex h-[var(--gb-spacing-8)] w-full items-center gap-[var(--gb-spacing-3)]",
        "rounded-[var(--gb-radius-scale-sm)] px-[var(--gb-spacing-2)] outline-none",
        "text-[var(--gb-text-default)] transition-colors",
        "hover:bg-[var(--gb-background-mute)] hover:text-[var(--gb-text-static-white)]",
        "focus-visible:shadow-[var(--gb-shadow-focus-ring)]",
        className,
      )}
    >
      <Megaphone aria-hidden="true" className="size-[var(--gb-spacing-3)] shrink-0" />
      <span className="min-w-0 flex-1 truncate text-left text-xs-regular">
        {label}
      </span>
      {unread ? (
        <span
          aria-hidden="true"
          className={cn(
            "size-[var(--gb-spacing-1)] shrink-0 rounded-[var(--gb-radius-scale-full)]",
            "bg-[var(--gb-background-warning-default)]",
          )}
        />
      ) : null}
    </button>
  );
}

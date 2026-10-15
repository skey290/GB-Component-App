"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Chatbox } from "@/components/ui/chatbox";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";

export type GoalSettingPostingFrequency = "Daily" | "Weekly" | "Monthly";
export type GoalSettingTrackingFrequency = "Weekly" | "Monthly" | "Quarterly";

const POSTING_FREQUENCIES: readonly GoalSettingPostingFrequency[] = [
  "Daily",
  "Weekly",
  "Monthly",
];
const TRACKING_FREQUENCIES: readonly GoalSettingTrackingFrequency[] = [
  "Weekly",
  "Monthly",
  "Quarterly",
];

/** Figma `Targeted Followers` 슬라이더 스케일 레이블 6개 */
export const TARGETED_FOLLOWERS_LABELS = [
  "1,000",
  "5,000",
  "10,000",
  "50,000",
  "1M",
  "1M+",
] as const;

interface GoalSettingSharedProps {
  /** 닫기(X) 버튼 클릭 시 호출됩니다 */
  onClose?: () => void;
  /** 루트에 병합 */
  className?: string;
}

export interface GoalSettingEmptyProps extends GoalSettingSharedProps {
  type?: "empty";
  /** Chatbox 전송(✨) 시 입력된 설명과 함께 호출됩니다 */
  onSubmitDescription?: (description: string) => void;
  onSave?: () => void;
}

export interface GoalSettingFilledProps extends GoalSettingSharedProps {
  type: "filled";
  /**
   * 자기소개 1문단 서술 텍스트. `{brandPosition}`, `{target}` 자리에 아래
   * brandPosition/target 값이 Badge로 자동 삽입됩니다 — 값은 여기서 중복
   * 입력하지 않습니다.
   */
  paragraph1Template: string;
  /**
   * 자기소개 2문단 서술 텍스트. `{postingSummary}`(Posting Frequency/카운터
   * 기반 "3 time(s) a day"), `{targetedFollowers}`(Targeted Followers
   * 슬라이더 값), `{trackingFrequency}` 자리에 해당 값이 Badge로 자동
   * 삽입됩니다.
   */
  paragraph2Template: string;
  /** 제어 컴포넌트로 사용할 때의 Brand Position 값 */
  brandPosition?: string;
  /** 비제어 컴포넌트로 사용할 때의 초기 Brand Position 값 */
  defaultBrandPosition?: string;
  onBrandPositionChange?: (value: string) => void;
  brandPositionFile?: File | null;
  onBrandPositionFileChange?: (file: File | null) => void;
  /** 제어 컴포넌트로 사용할 때의 Target 값 */
  target?: string;
  /** 비제어 컴포넌트로 사용할 때의 초기 Target 값 */
  defaultTarget?: string;
  onTargetChange?: (value: string) => void;
  targetFile?: File | null;
  onTargetFileChange?: (file: File | null) => void;
  /** 제어 컴포넌트로 사용할 때의 Posting Frequency 선택값 */
  postingFrequency?: GoalSettingPostingFrequency;
  /** 비제어 컴포넌트로 사용할 때의 초기 Posting Frequency 선택값 */
  defaultPostingFrequency?: GoalSettingPostingFrequency;
  onPostingFrequencyChange?: (value: GoalSettingPostingFrequency) => void;
  /** 제어 컴포넌트로 사용할 때의 Posting 카운터 값 */
  postingCount?: number;
  /** 비제어 컴포넌트로 사용할 때의 초기 Posting 카운터 값 */
  defaultPostingCount?: number;
  onPostingCountChange?: (value: number) => void;
  /** 제어 컴포넌트로 사용할 때의 `TARGETED_FOLLOWERS_LABELS` 인덱스(0~5) */
  targetedFollowersIndex?: number;
  /** 비제어 컴포넌트로 사용할 때의 초기 인덱스(0~5) */
  defaultTargetedFollowersIndex?: number;
  onTargetedFollowersIndexChange?: (index: number) => void;
  /** 제어 컴포넌트로 사용할 때의 Tracking Frequency 선택값 */
  trackingFrequency?: GoalSettingTrackingFrequency;
  /** 비제어 컴포넌트로 사용할 때의 초기 Tracking Frequency 선택값 */
  defaultTrackingFrequency?: GoalSettingTrackingFrequency;
  onTrackingFrequencyChange?: (value: GoalSettingTrackingFrequency) => void;
  onSave?: () => void;
}

export type GoalSettingProps = GoalSettingEmptyProps | GoalSettingFilledProps;

const ROOT_CLASS = cn(
  "relative flex w-[560px] flex-col items-stretch",
  "rounded-[var(--gb-radius-scale-3xl)] p-[var(--gb-spacing-8)]",
  "border-[length:var(--gb-border-1)] border-solid border-[var(--gb-border-subtler)]",
  "bg-[var(--gb-background-default)] shadow-[var(--gb-shadow-lg)]",
);

function CloseButton({ onClose }: { onClose?: () => void }) {
  return (
    <Button
      type="button"
      variant="icon-ghost"
      icon="x-icon"
      aria-label="닫기"
      onClick={onClose}
      className="absolute top-[28px] right-[18px]"
    />
  );
}

function FrequencyGroup<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: readonly T[];
  value?: T;
  onChange?: (value: T) => void;
}) {
  return (
    <div
      role="group"
      aria-label={label}
      className="flex w-full items-center gap-[var(--gb-spacing-2)]"
    >
      {options.map((option) => {
        const isSelected = option === value;
        return (
          <Button
            key={option}
            type="button"
            variant="outline"
            aria-pressed={isSelected}
            onClick={() => onChange?.(option)}
            className={cn(
              "flex-1",
              isSelected &&
                "border-transparent bg-[var(--gb-background-mute)] text-[var(--gb-text-static-white)]",
            )}
          >
            {option}
          </Button>
        );
      })}
    </div>
  );
}

const PARAGRAPH_PLACEHOLDER_PATTERN = /\{(\w+)\}/g;

/** `{key}` 자리에 해당 값을 Badge로 끼워 넣어 문단을 조립합니다. */
function renderParagraphTemplate(
  template: string,
  values: Record<string, string>,
) {
  const nodes: React.ReactNode[] = [];
  let lastIndex = 0;
  let chipIndex = 0;
  for (const match of template.matchAll(PARAGRAPH_PLACEHOLDER_PATTERN)) {
    const [token, key] = match;
    const index = match.index ?? 0;
    if (index > lastIndex) {
      nodes.push(template.slice(lastIndex, index));
    }
    const value = values[key];
    nodes.push(
      value !== undefined ? (
        <Badge
          key={`chip-${chipIndex++}`}
          variant="default"
          size="20"
          className="align-middle"
        >
          {value}
        </Badge>
      ) : (
        token
      ),
    );
    lastIndex = index + token.length;
  }
  if (lastIndex < template.length) {
    nodes.push(template.slice(lastIndex));
  }
  return nodes;
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-sm-semi-bold w-full text-[var(--gb-text-default)]">
      {children}
    </p>
  );
}

function GoalSettingEmptyView({
  onClose,
  onSubmitDescription,
  onSave,
  className,
}: GoalSettingEmptyProps) {
  const [description, setDescription] = React.useState("");

  return (
    <div className={cn(ROOT_CLASS, "gap-[var(--gb-spacing-5)]", className)}>
      <CloseButton onClose={onClose} />
      <p className="text-xl-black text-[var(--gb-text-default)]">My goal</p>
      <Chatbox
        value={description}
        onValueChange={setDescription}
        onSend={() => onSubmitDescription?.(description)}
        placeholder="Describe the Self you want to create — who you want to be known as, what you want to share, and what you want to achieve. e.g. A style enthusiast known for everyday fashion inspiration, sharing outfit ideas and styling tips with people who want to look good in real life."
        className="w-full"
      />
      <Button type="button" variant="primary" onClick={onSave} className="w-full">
        Save
      </Button>
    </div>
  );
}

function GoalSettingFilledView({
  onClose,
  paragraph1Template,
  paragraph2Template,
  brandPosition,
  defaultBrandPosition = "",
  onBrandPositionChange,
  brandPositionFile = null,
  onBrandPositionFileChange,
  target,
  defaultTarget = "",
  onTargetChange,
  targetFile = null,
  onTargetFileChange,
  postingFrequency,
  defaultPostingFrequency = "Daily",
  onPostingFrequencyChange,
  postingCount,
  defaultPostingCount = 3,
  onPostingCountChange,
  targetedFollowersIndex,
  defaultTargetedFollowersIndex = 1,
  onTargetedFollowersIndexChange,
  trackingFrequency,
  defaultTrackingFrequency = "Monthly",
  onTrackingFrequencyChange,
  onSave,
  className,
}: GoalSettingFilledProps) {
  const [uncontrolledBrandPosition, setUncontrolledBrandPosition] =
    React.useState(defaultBrandPosition);
  const currentBrandPosition = brandPosition ?? uncontrolledBrandPosition;
  const handleBrandPositionChange = (value: string) => {
    if (brandPosition === undefined) setUncontrolledBrandPosition(value);
    onBrandPositionChange?.(value);
  };

  const [uncontrolledTarget, setUncontrolledTarget] =
    React.useState(defaultTarget);
  const currentTarget = target ?? uncontrolledTarget;
  const handleTargetChange = (value: string) => {
    if (target === undefined) setUncontrolledTarget(value);
    onTargetChange?.(value);
  };

  const [uncontrolledPostingFrequency, setUncontrolledPostingFrequency] =
    React.useState(defaultPostingFrequency);
  const currentPostingFrequency = postingFrequency ?? uncontrolledPostingFrequency;
  const handlePostingFrequencyChange = (value: GoalSettingPostingFrequency) => {
    if (postingFrequency === undefined) setUncontrolledPostingFrequency(value);
    onPostingFrequencyChange?.(value);
  };

  const [uncontrolledPostingCount, setUncontrolledPostingCount] =
    React.useState(defaultPostingCount);
  const currentPostingCount = postingCount ?? uncontrolledPostingCount;
  const handlePostingCountChange = (value: number) => {
    if (postingCount === undefined) setUncontrolledPostingCount(value);
    onPostingCountChange?.(value);
  };

  const [
    uncontrolledTargetedFollowersIndex,
    setUncontrolledTargetedFollowersIndex,
  ] = React.useState(defaultTargetedFollowersIndex);
  const currentTargetedFollowersIndex =
    targetedFollowersIndex ?? uncontrolledTargetedFollowersIndex;
  const handleTargetedFollowersIndexChange = (index: number) => {
    if (targetedFollowersIndex === undefined)
      setUncontrolledTargetedFollowersIndex(index);
    onTargetedFollowersIndexChange?.(index);
  };

  const [uncontrolledTrackingFrequency, setUncontrolledTrackingFrequency] =
    React.useState(defaultTrackingFrequency);
  const currentTrackingFrequency = trackingFrequency ?? uncontrolledTrackingFrequency;
  const handleTrackingFrequencyChange = (value: GoalSettingTrackingFrequency) => {
    if (trackingFrequency === undefined) setUncontrolledTrackingFrequency(value);
    onTrackingFrequencyChange?.(value);
  };

  const targetedFollowers =
    TARGETED_FOLLOWERS_LABELS[currentTargetedFollowersIndex] ??
    TARGETED_FOLLOWERS_LABELS[0];
  const postingSummary = `${currentPostingCount} time${currentPostingCount === 1 ? "" : "s"} a day`;

  return (
    <div className={cn(ROOT_CLASS, "gap-[var(--gb-spacing-7)]", className)}>
      <CloseButton onClose={onClose} />
      <p className="text-xl-black text-[var(--gb-text-default)]">My goal</p>

      <div className="flex w-full flex-col gap-[var(--gb-spacing-4)]">
        <p className="text-base-regular text-[var(--gb-text-default)]">
          {renderParagraphTemplate(paragraph1Template, {
            brandPosition: currentBrandPosition,
            target: currentTarget,
          })}
        </p>
        <p
          data-testid="paragraph2"
          className="text-base-regular text-[var(--gb-text-default)]"
        >
          {renderParagraphTemplate(paragraph2Template, {
            postingSummary,
            targetedFollowers,
            trackingFrequency: currentTrackingFrequency.toLowerCase(),
          })}
        </p>
      </div>

      <div className="h-[length:var(--gb-border-1)] w-full bg-[var(--gb-border-default)]" />

      <div className="flex w-full flex-col gap-[var(--gb-spacing-4)]">
        <Input
          label="Brand Position"
          description=""
          showSelect={false}
          showLink={false}
          textfieldValue={currentBrandPosition}
          onTextfieldValueChange={handleBrandPositionChange}
          textfieldPlaceholder="Brand Position"
          file={brandPositionFile}
          onFileChange={onBrandPositionFileChange}
          className="w-full"
        />
        <Input
          label="Target"
          description=""
          showSelect={false}
          showLink={false}
          textfieldValue={currentTarget}
          onTextfieldValueChange={handleTargetChange}
          textfieldPlaceholder="Target"
          file={targetFile}
          onFileChange={onTargetFileChange}
          className="w-full"
        />
      </div>

      <div className="flex w-full flex-col gap-[var(--gb-spacing-3)]">
        <SectionLabel>Posting Frequency</SectionLabel>
        <div className="flex w-full flex-col gap-[var(--gb-spacing-3)]">
          <FrequencyGroup
            label="Posting Frequency"
            options={POSTING_FREQUENCIES}
            value={currentPostingFrequency}
            onChange={handlePostingFrequencyChange}
          />
          <div className="flex items-center gap-[var(--gb-spacing-2)]">
            <Button
              type="button"
              variant="icon-rounded"
              icon="minus-icon"
              aria-label="감소"
              onClick={() =>
                handlePostingCountChange(Math.max(1, currentPostingCount - 1))
              }
              className="size-[24px]"
            />
            <span className="text-xs-medium text-[var(--gb-text-default)]">
              {currentPostingCount} time(s) a day
            </span>
            <Button
              type="button"
              variant="icon-rounded"
              icon="plus-icon"
              aria-label="증가"
              onClick={() => handlePostingCountChange(currentPostingCount + 1)}
              className="size-[24px]"
            />
          </div>
        </div>
      </div>

      <div className="flex w-full flex-col gap-[var(--gb-spacing-3)]">
        <SectionLabel>Targeted Followers</SectionLabel>
        <Slider
          value={currentTargetedFollowersIndex}
          onValueChange={handleTargetedFollowersIndexChange}
          min={0}
          max={TARGETED_FOLLOWERS_LABELS.length - 1}
          step={1}
          aria-label="Targeted Followers"
          className="w-full"
        />
        <div className="relative h-[var(--gb-spacing-4)] w-full">
          {TARGETED_FOLLOWERS_LABELS.map((label, index) => {
            const isFirst = index === 0;
            const isLast = index === TARGETED_FOLLOWERS_LABELS.length - 1;
            return (
              <span
                key={label}
                style={{
                  left: `${(index / (TARGETED_FOLLOWERS_LABELS.length - 1)) * 100}%`,
                }}
                className={cn(
                  "text-xs-regular absolute whitespace-nowrap text-[var(--gb-text-subtle)]",
                  isFirst
                    ? "translate-x-0"
                    : isLast
                      ? "-translate-x-full"
                      : "-translate-x-1/2",
                )}
              >
                {label}
              </span>
            );
          })}
        </div>
      </div>

      <div className="flex w-full flex-col gap-[var(--gb-spacing-3)]">
        <SectionLabel>Tracking Frequency</SectionLabel>
        <FrequencyGroup
          label="Tracking Frequency"
          options={TRACKING_FREQUENCIES}
          value={currentTrackingFrequency}
          onChange={handleTrackingFrequencyChange}
        />
      </div>

      <Button type="button" variant="primary" onClick={onSave} className="w-full">
        Save
      </Button>
    </div>
  );
}

export function GoalSetting(props: GoalSettingProps) {
  if (props.type === "filled") {
    return <GoalSettingFilledView {...props} />;
  }
  return <GoalSettingEmptyView {...props} />;
}

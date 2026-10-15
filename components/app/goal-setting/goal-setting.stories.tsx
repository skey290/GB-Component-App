import type { Meta, StoryObj } from "@storybook/nextjs";
import { fn } from "storybook/test";

import { GoalSetting } from "./goal-setting";

const FIGMA_URL =
  "https://www.figma.com/design/Wp6AZNGqC4qf2Sz5zQ2PzQ/%F0%9F%93%8C-GB_UXUI--261002-?node-id=8234-99895";

const meta = {
  title: "App/GoalSetting",
  component: GoalSetting,
  tags: ["autodocs"],
  parameters: {
    design: {
      type: "figma",
      url: FIGMA_URL,
    },
  },
  argTypes: {
    type: {
      control: "radio",
      options: ["empty", "filled"],
    },
    paragraph1Template: { control: "text" },
    paragraph2Template: { control: "text" },
    defaultPostingFrequency: {
      control: "radio",
      options: ["Daily", "Weekly", "Monthly"],
    },
    defaultTrackingFrequency: {
      control: "radio",
      options: ["Weekly", "Monthly", "Quarterly"],
    },
    defaultTargetedFollowersIndex: {
      control: { type: "range", min: 0, max: 5, step: 1 },
    },
    defaultPostingCount: { control: { type: "number", min: 1 } },
  },
  args: {
    type: "filled",
    // 샘플 콘텐츠는 "데이터 사이언티스트" 예시 하나일 뿐이며, {brandPosition}/
    // {target}/{postingSummary}/{targetedFollowers}/{trackingFrequency} 자리의
    // 실제 값은 전부 아래 필드(및 그 필드로부터 파생된 값)에서 자동으로 채워진다
    // — 서술 문장(Template)만 자유롭게 바뀔 수 있는 부분이다.
    paragraph1Template:
      "I'm a data scientist who translates statistical rigor into numbers finance teams actually trust, positioned as a {brandPosition} for {target} who need revenue forecasts investors and finance leads can act on.",
    paragraph2Template:
      "I share {postingSummary} actionable insights and case studies with approximately {targetedFollowers} targeted followers, maintaining consistent {trackingFrequency} reach and engagement that reflects genuine interest in helping SaaS companies reach seven-figure ARR.",
    brandPosition: "Finance-Fluent Modeling Partner",
    target: "early-stage SaaS founders",
    defaultPostingFrequency: "Daily",
    defaultPostingCount: 3,
    defaultTargetedFollowersIndex: 1,
    defaultTrackingFrequency: "Monthly",
    onClose: fn(),
    onSave: fn(),
    onBrandPositionChange: fn(),
    onTargetChange: fn(),
    onPostingFrequencyChange: fn(),
    onPostingCountChange: fn(),
    onTargetedFollowersIndexChange: fn(),
    onTrackingFrequencyChange: fn(),
  },
} satisfies Meta<typeof GoalSetting>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

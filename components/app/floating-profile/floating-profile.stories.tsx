import type { Meta, StoryObj } from "@storybook/nextjs";
import { fn } from "storybook/test";

import { FloatingProfile } from "./floating-profile";

const FIGMA_FILE =
  "https://www.figma.com/design/Wp6AZNGqC4qf2Sz5zQ2PzQ/%F0%9F%93%8C-GB_UXUI--261002-";
const FIGMA_URL = `${FIGMA_FILE}?node-id=8163-92774`;

const AVATAR_SRC = "/images/personas/self-default.jpg";
const PORTRAIT_SRC = "/images/personas/self-default.jpg";

const meta = {
  title: "App/FloatingProfile",
  component: FloatingProfile,
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
          "프로필 플로팅 패널. 아바타 버블을 클릭하면 역할명/폴라로이드 사진/버튼 4개/태그라인·본문이 담긴 카드가 펼쳐진다. 아바타 이미지가 없으면(Type=no profile) 아이콘 폴백만 표시되고 카드가 열리지 않는다. components/app/floating-profile(FloatingProfile)로 구현된다.",
      },
    },
  },
  // 카드는 아바타 기준 왼쪽으로 620px 펼쳐짐 — 뷰포트 음수 좌표로 밀려나 보이지
  // 않는 걸 막기 위한 순수 프레젠테이션용 여백 (디자인 토큰과 무관).
  decorators: [
    (Story) => (
      <div className="pl-[700px]">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    open: { control: "boolean" },
    avatarSrc: {
      control: "text",
      description:
        "비우면 'no profile' 상태(아이콘 폴백) — 아바타 클릭도 비활성화됩니다.",
    },
    title: { control: "text" },
    tagline: { control: "text" },
    bio: { control: "text" },
    timestamp: { control: "text" },
    ctaLabel: { control: "text" },
  },
  args: {
    open: true,
    avatarSrc: AVATAR_SRC,
    title: "Data Scientist",
    portraitSrc: PORTRAIT_SRC,
    timestamp: "2026.03.24 19:24:06",
    tagline:
      "4 years in finance, 3 in data science — forecasting Finance teams trust.",
    bio: "Four years in finance. Three in data science. She builds forecasting models with the accounting logic most data scientists skip — the reason Finance teams trust the output. Two freelance projects outside the office proved it holds up beyond a single team's walls. Not a title she chose, but one the work has already earned.",
    onOpenChange: fn(),
    onShare: fn(),
    onEditAssets: fn(),
    onEditGoal: fn(),
    onCtaClick: fn(),
  },
} satisfies Meta<typeof FloatingProfile>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

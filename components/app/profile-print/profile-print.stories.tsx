import type { Meta, StoryObj } from "@storybook/nextjs";
import { fn } from "storybook/test";

import { ProfilePrint } from "./profile-print";

const FIGMA_FILE =
  "https://www.figma.com/design/Wp6AZNGqC4qf2Sz5zQ2PzQ/%F0%9F%93%8C-GB_UXUI--261002-";

const PORTRAIT_SRC = "/images/personas/self-default.jpg";

const meta = {
  title: "App/ProfilePrint",
  component: ProfilePrint,
  tags: ["autodocs"],
  parameters: {
    design: {
      type: "figma",
      url: `${FIGMA_FILE}?node-id=8163-92698`,
    },
    // Figma 컴포넌트 description 필드 원문
    docs: {
      description: {
        component:
          "프로필 이미지를 출력하는 카드. type이 process(처리 중 로더)/completed(완성된 인물 사진+타임스탬프)/upload(빈 상태, 파일 업로드 CTA) 세 상태를 가진다. components/app/profile-print(ProfilePrint)로 구현된다.",
      },
    },
  },
  argTypes: {
    type: {
      control: "radio",
      options: ["process", "completed", "upload"],
    },
    timestamp: { control: "text" },
  },
  args: {
    type: "process",
    timestamp: "2026.03.24 19:24:06",
    portraitSrc: PORTRAIT_SRC,
    onFileSelect: fn(),
  },
} satisfies Meta<typeof ProfilePrint>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

import type { Meta, StoryObj } from "@storybook/nextjs";
import { fn } from "storybook/test";

import {
  ChatboxComposer,
  type ChatboxComposerImage,
  type ChatboxComposerProps,
} from "./chatbox-composer";

// Figma `Type=image` variant는 썸네일 3장이 고정 콘텐츠로 박혀있는 정적
// 예시다 — variant 전환 자체가 "이미지 3장 첨부된 상태"를 보여준다. Storybook도
// defaultImages를 따로 지정하지 않으면 variant="image" 선택 시 샘플 썸네일로
// 그 상태를 보여준다.
const SAMPLE_IMAGES: ChatboxComposerImage[] = [
  { src: "/images/personas/entrepreneur.jpg", alt: "Entrepreneur" },
  { src: "/images/personas/novelist.jpg", alt: "Novelist" },
  { src: "/images/personas/yoga-meditator.jpg", alt: "Yoga meditator" },
];

function ComposerPreview(props: ChatboxComposerProps) {
  const defaultImages =
    props.defaultImages ??
    (props.variant === "image" ? SAMPLE_IMAGES : undefined);

  return (
    <ChatboxComposer
      key={props.variant}
      {...props}
      defaultImages={defaultImages}
    />
  );
}

const meta = {
  title: "App/ChatboxComposer",
  component: ChatboxComposer,
  tags: ["autodocs"],
  parameters: {
    // Figma 컴포넌트 description 필드 원문
    docs: {
      description: {
        component:
          "Chatbox의 슬롯에 들어가는 콘텐츠 — 삭제 배지가 있는 이미지 썸네일, 삭제 아이콘이 있는 필터 chips, 또는 sentence option 중 하나. components/app/chatbox-composer(ChatboxComposer)로 구현된다. Type=options(sentence-option)의 3개 행은 아이콘 없이 라벨이 가운데 정렬되며, 기본적으로 전부 미선택 상태다(Figma에 선택됨 전용 variant가 없어, 클릭 후 강조 색은 코드가 Button의 Status=active 토큰을 재사용한 것).",
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "image", "chip", "sentence-option"],
    },
    disabled: { control: "boolean" },
    placeholder: { control: "text" },
    defaultValue: { control: "text" },
    defaultImages: {
      control: "object",
      description:
        "지정하지 않으면 variant=image일 때 샘플 썸네일 3장이 표시됩니다.",
    },
    value: { control: false },
    images: { control: false },
  },
  args: {
    variant: "default",
    disabled: false,
    onValueChange: fn(),
    onAttach: fn(),
    onSend: fn(),
    onRemoveImage: fn(),
  },
  render: (args) => <ComposerPreview {...args} />,
} satisfies Meta<typeof ChatboxComposer>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

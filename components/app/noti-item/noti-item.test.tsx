import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

import { NotiItem } from "./noti-item";

describe("NotiItem", () => {
  it("renders the label", () => {
    render(<NotiItem label="New comment" />);
    expect(screen.getByText("New comment")).toBeInTheDocument();
  });

  it("does not render an unread dot by default", () => {
    render(<NotiItem label="New comment" />);
    expect(document.querySelector('[aria-hidden="true"].bg-\\[var\\(--gb-background-warning-default\\)\\]')).not.toBeInTheDocument();
  });

  it("renders an unread dot when unread=true", () => {
    const { container } = render(<NotiItem label="New comment" unread />);
    expect(
      container.querySelector(".bg-\\[var\\(--gb-background-warning-default\\)\\]"),
    ).toBeInTheDocument();
  });
});

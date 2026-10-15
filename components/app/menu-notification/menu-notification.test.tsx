import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { MenuNotification } from "./menu-notification";

describe("MenuNotification", () => {
  it("renders an icon-only button named 'Notification' by default", () => {
    render(<MenuNotification />);
    expect(
      screen.getByRole("button", { name: "Notification" }),
    ).toBeInTheDocument();
  });

  it("renders the label text when type='text'", () => {
    render(<MenuNotification type="text" />);
    expect(screen.getByText("Notification")).toBeInTheDocument();
  });

  it("shows the dot-bell icon by default for default/active status", () => {
    const { rerender } = render(<MenuNotification status="default" />);
    expect(screen.getByTestId("menu-notification-icon")).toHaveAttribute(
      "data-dot",
      "true",
    );

    rerender(<MenuNotification status="active" />);
    expect(screen.getByTestId("menu-notification-icon")).toHaveAttribute(
      "data-dot",
      "true",
    );
  });

  it("falls back to the plain bell icon when status='disabled'", () => {
    render(<MenuNotification status="disabled" />);
    expect(
      screen.getByTestId("menu-notification-icon"),
    ).not.toHaveAttribute("data-dot");
  });

  it("falls back to the plain bell icon when showDot=false regardless of status", () => {
    render(<MenuNotification status="default" showDot={false} />);
    expect(
      screen.getByTestId("menu-notification-icon"),
    ).not.toHaveAttribute("data-dot");
  });

  it("marks status='active' with aria-current", () => {
    render(<MenuNotification status="active" />);
    expect(
      screen.getByRole("button", { name: "Notification" }),
    ).toHaveAttribute("aria-current", "true");
  });

  it("disables the button when status='disabled'", () => {
    render(<MenuNotification status="disabled" />);
    expect(screen.getByRole("button", { name: "Notification" })).toBeDisabled();
  });

  it("calls onClick when clicked", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<MenuNotification onClick={onClick} />);

    await user.click(screen.getByRole("button", { name: "Notification" }));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not call onClick when disabled", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<MenuNotification status="disabled" onClick={onClick} />);

    await user.click(screen.getByRole("button", { name: "Notification" }));

    expect(onClick).not.toHaveBeenCalled();
  });
});

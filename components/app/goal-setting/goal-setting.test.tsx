import { describe, expect, it, vi } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { GoalSetting } from "./goal-setting";

describe("GoalSetting", () => {
  it("renders the empty state with the title and Chatbox", () => {
    render(<GoalSetting type="empty" />);

    expect(screen.getByText("My goal")).toBeInTheDocument();
    expect(
      screen.getByText(/Describe the Self you want to create/),
    ).toBeInTheDocument();
  });

  it("calls onSubmitDescription with the typed text when the empty state is sent", async () => {
    const user = userEvent.setup();
    const onSubmitDescription = vi.fn();
    render(
      <GoalSetting type="empty" onSubmitDescription={onSubmitDescription} />,
    );

    const textarea = screen.getByPlaceholderText("Please share your ideas.");
    await user.type(textarea, "hello");
    await user.click(screen.getByRole("button", { name: "전송" }));

    expect(onSubmitDescription).toHaveBeenCalledWith("hello");
  });

  it("fills paragraph placeholders with the brandPosition/target values, not separate free text", () => {
    render(
      <GoalSetting
        type="filled"
        paragraph1Template="Positioned as a {brandPosition} for {target}."
        paragraph2Template="Reaching {targetedFollowers} at a {trackingFrequency} cadence, {postingSummary}."
        brandPosition="Finance-Fluent Modeling Partner"
        target="early-stage SaaS founders"
        postingCount={3}
        targetedFollowersIndex={1}
        trackingFrequency="Monthly"
      />,
    );

    expect(
      screen.getByText("Finance-Fluent Modeling Partner"),
    ).toBeInTheDocument();
    expect(screen.getByText("early-stage SaaS founders")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "5,000" }),
    ).toBeInTheDocument();
    expect(screen.getByText("monthly")).toBeInTheDocument();
    expect(screen.getByText("3 times a day")).toBeInTheDocument();
  });

  it("keeps the inline chip values in sync when the underlying fields change", () => {
    const { rerender } = render(
      <GoalSetting
        type="filled"
        paragraph1Template="{brandPosition}"
        paragraph2Template="{targetedFollowers}"
        brandPosition="Finance-Fluent Modeling Partner"
        target="early-stage SaaS founders"
        targetedFollowersIndex={0}
      />,
    );
    expect(
      screen.getByRole("button", { name: "1,000" }),
    ).toBeInTheDocument();

    rerender(
      <GoalSetting
        type="filled"
        paragraph1Template="{brandPosition}"
        paragraph2Template="{targetedFollowers}"
        brandPosition="Finance-Fluent Modeling Partner"
        target="early-stage SaaS founders"
        targetedFollowersIndex={3}
      />,
    );
    expect(
      screen.getByRole("button", { name: "50,000" }),
    ).toBeInTheDocument();
  });

  it("renders the filled state with the Brand Position / Target inputs", () => {
    render(
      <GoalSetting
        type="filled"
        paragraph1Template="p1"
        paragraph2Template="p2"
        brandPosition="Finance-Fluent Modeling Partner"
        target="early-stage SaaS founders"
      />,
    );

    expect(screen.getByText("Brand Position")).toBeInTheDocument();
    expect(screen.getByText("Target")).toBeInTheDocument();
    expect(
      screen.getByDisplayValue("Finance-Fluent Modeling Partner"),
    ).toBeInTheDocument();
  });

  it("switches Posting Frequency selection when clicked", async () => {
    const user = userEvent.setup();
    const onPostingFrequencyChange = vi.fn();
    render(
      <GoalSetting
        type="filled"
        paragraph1Template="p1"
        paragraph2Template="p2"
        brandPosition="a"
        target="b"
        postingFrequency="Daily"
        onPostingFrequencyChange={onPostingFrequencyChange}
      />,
    );

    const postingGroup = screen.getByRole("group", {
      name: "Posting Frequency",
    });
    await user.click(within(postingGroup).getByRole("button", { name: "Weekly" }));

    expect(onPostingFrequencyChange).toHaveBeenCalledWith("Weekly");
  });

  it("increments the posting count", async () => {
    const user = userEvent.setup();
    const onPostingCountChange = vi.fn();
    render(
      <GoalSetting
        type="filled"
        paragraph1Template="p1"
        paragraph2Template="p2"
        brandPosition="a"
        target="b"
        postingCount={3}
        onPostingCountChange={onPostingCountChange}
      />,
    );

    await user.click(screen.getByRole("button", { name: "증가" }));

    expect(onPostingCountChange).toHaveBeenCalledWith(4);
  });

  it("updates the posting count and selection visibly when used uncontrolled", async () => {
    const user = userEvent.setup();
    render(
      <GoalSetting
        type="filled"
        paragraph1Template="p1"
        paragraph2Template="p2"
        brandPosition="a"
        target="b"
        defaultPostingCount={3}
      />,
    );

    expect(screen.getByText("3 time(s) a day")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "증가" }));
    expect(screen.getByText("4 time(s) a day")).toBeInTheDocument();

    const trackingGroup = screen.getByRole("group", {
      name: "Tracking Frequency",
    });
    await user.click(
      within(trackingGroup).getByRole("button", { name: "Weekly" }),
    );
    expect(
      within(trackingGroup).getByRole("button", {
        name: "Weekly",
        pressed: true,
      }),
    ).toBeInTheDocument();
  });

  it("calls onSave when the Save button is clicked", async () => {
    const user = userEvent.setup();
    const onSave = vi.fn();
    render(
      <GoalSetting
        type="filled"
        paragraph1Template="p1"
        paragraph2Template="p2"
        brandPosition="a"
        target="b"
        onSave={onSave}
      />,
    );

    await user.click(screen.getByRole("button", { name: "Save" }));

    expect(onSave).toHaveBeenCalledTimes(1);
  });

  it("calls onClose when the close button is clicked in either state", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<GoalSetting type="empty" onClose={onClose} />);

    await user.click(screen.getByRole("button", { name: "닫기" }));

    expect(onClose).toHaveBeenCalledTimes(1);
  });
});

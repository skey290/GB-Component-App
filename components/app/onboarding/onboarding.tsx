import * as React from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export interface OnboardingProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  /** "Continue with Google" 버튼 클릭 시 호출됩니다 */
  onContinueWithGoogle: () => void;
}

export const Onboarding = React.forwardRef<HTMLDivElement, OnboardingProps>(
  function Onboarding({ onContinueWithGoogle, className, ...props }, ref) {
    return (
      <div
        ref={ref}
        className={cn(
          "flex h-[1038px] w-[660px] min-w-[660px] max-w-[660px] flex-col items-center justify-center",
          "gap-[var(--gb-spacing-8)] bg-[var(--gb-background-subtlest)] px-[var(--gb-spacing-12)] py-[var(--gb-spacing-8)]",
          className,
        )}
        {...props}
      >
        <div className="relative h-[388px] w-[258px] shrink-0 overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/onboarding/pixelated-human.png"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 size-full object-cover"
          />
        </div>

        <div className="flex shrink-0 flex-col items-center gap-[var(--gb-spacing-2)]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/logo.png"
            alt="Gabrielle"
            className="h-[18px] w-[150px]"
          />
          <p className="text-xs-light text-[var(--gb-text-default)]">
            Welcome to Gabrielle, an agent for your personal branding.
          </p>
        </div>

        <div className="flex w-[384px] shrink-0 flex-col items-center justify-center gap-[var(--gb-spacing-6)] rounded-[var(--gb-radius-scale-2xl)] px-[var(--gb-spacing-5)] py-[var(--gb-spacing-6)]">
          <div className="flex w-[344px] shrink-0 flex-col items-center gap-[var(--gb-spacing-2)]">
            <Button
              variant="google"
              className="w-full"
              onClick={onContinueWithGoogle}
            />
            <p className="text-xs-light text-center text-[var(--gb-text-subtle)]">
              Sign up or Log in using Google account.
            </p>
          </div>
        </div>
      </div>
    );
  },
);

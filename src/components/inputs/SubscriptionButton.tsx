"use client";
import { cn } from "@/lib/utils";

import { Button, buttonVariants } from "@/components/ui/button";
import type { VariantProps } from "class-variance-authority";
interface SubscriptionButtonProps extends VariantProps<typeof buttonVariants> {
  onClick: () => void;
  disabled: boolean;
  isSubscribed: boolean;
  className?: string;

}
const SubscriptionButton = ({
  onClick,
  disabled,
  isSubscribed,
  className,
  size,
}: SubscriptionButtonProps) => {
  return (
    <Button
      size={size}
      variant={isSubscribed ? "secondary" : "default"}
      className={cn("rounded-full", className)}
      disabled={disabled}
      onClick={onClick}
    >
      {isSubscribed ? "Unsubscribe" : "Subscribe"}
    </Button>
  );
};
export default SubscriptionButton;

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const flexVariants = cva("flex", {
  variants: {
    justify: {
      start: "justify-start",
      center: "justify-center",
      end: "justify-end",
      between: "justify-between",
      around: "justify-around",
      evenly: "justify-evenly",
    },
    align: {
      start: "items-start",
      center: "items-center",
      end: "items-end",
      stretch: "items-stretch",
    },
    wrap: {
      nowrap: "flex-nowrap",
      wrap: "flex-wrap",
      reverse: "flex-wrap-reverse",
    },
    gap: {
      0: "gap-0",
      1: "gap-1",
      2: "gap-2",
      4: "gap-4",
      6: "gap-6",
      8: "gap-8",
    },
  },
  defaultVariants: {
    justify: "start",
    align: "start",
    wrap: "nowrap",
    gap: 0,
  },
});

type FlexProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof flexVariants> & {
    vertical?: boolean;
    asChild?: boolean;
  };

function Flex({
  className,
  justify,
  align,
  wrap,
  gap,
  vertical = false,
  asChild = false,
  ...props
}: FlexProps) {
  const Comp = asChild ? Slot : "div";

  return (
    <Comp
      data-slot="flex"
      className={cn(
        "flex",
        vertical ? "flex-col" : "flex-row",
        flexVariants({ justify, align, wrap, gap }),
        className
      )}
      {...props}
    />
  );
}

export { Flex, flexVariants };

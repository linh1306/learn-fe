import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

type ContainerProps = React.HTMLAttributes<HTMLDivElement> & {
  asChild?: boolean;
};

function ContainerComponent({
  className,
  asChild = false,
  ...props
}: ContainerProps) {
  const Comp = asChild ? Slot : "div";
  return (
    <Comp
      data-slot="container"
      className={cn("flex flex-col h-screen", className)}
      {...props}
    />
  );
}

// Các component con
function Header({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div data-slot="header" className={cn("p-4", className)} {...props} />;
}

function Content({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const {id, ...prop} = props
  return (
    <div id={id} className="flex-1 p-4 scrollbar overflow-y-auto">
      <div data-slot="content" className={cn("", className)} {...prop} />
    </div>
  );
}

function Footer({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div data-slot="footer" className={cn("p-4", className)} {...props} />;
}

const Container = Object.assign(ContainerComponent, {
  Header,
  Content,
  Footer,
});

export { Container };

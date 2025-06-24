import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";
import { SidebarTrigger } from "../ui/sidebar";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

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
      className={cn("flex flex-col h-[100dvh]", className)}
      {...props}
    />
  );
}

// Các component con
function Header({ className, ...props }: React.HTMLAttributes<HTMLDivElement> & {
  hiddenMenu?: boolean
}) {
  const router = useRouter()
  return <div data-slot="header" className={cn("p-4 flex items-center border-b-2", className)} {...props} >
    <div className="flex items-center">
      <ArrowLeft className="cursor-pointer" size={16} onClick={() => router.back()} />
      {!props.hiddenMenu && <SidebarTrigger />}
      {props.title && <h1 className="text-lg font-semibold">{props.title}</h1>}
    </div>
    {props.children}
  </div>;
}

function Content({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const { id, ...prop } = props
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

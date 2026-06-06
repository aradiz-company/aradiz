import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const fancyButtonVariants = cva(
  "fancy group relative inline-block cursor-pointer overflow-visible bg-transparent text-center font-bold uppercase tracking-widest no-underline transition-all duration-300 ease-in-out select-none border-2",
  {
    variants: {
      variant: {
        primary:
          "border-primary text-primary hover:bg-primary hover:text-white",
        dark: "border-black text-black hover:bg-black hover:text-white",
        light: "border-white text-white hover:bg-white hover:text-black",
        secondary:
          "border-secondary/90 text-white bg-secondary/90 hover:bg-foreground hover:border-foreground",
      },
      size: {
        default: "px-6 py-3 text-[11px]",
        sm: "px-4 py-2 text-[10px]",
        lg: "px-8 py-5 text-[13px]",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

export interface FancyButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof fancyButtonVariants> {
  asChild?: boolean;
  showLine?: boolean;
  showKeys?: boolean;
}

const FancyButton = React.forwardRef<HTMLButtonElement, FancyButtonProps>(
  (
    {
      className,
      variant = "primary",
      size,
      asChild = false,
      showLine = false,
      showKeys = true,
      children,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";

    // Helper to render internal elements
    const renderContent = (innerChildren: React.ReactNode) => (
      <>
        {/* Left decoration line (::before) */}
        {showLine && (
          <span
            className={cn(
              "absolute left-[1.5em] top-1/2 h-[2px] w-[25px] -translate-y-1/2 transition-all duration-300 z-10",
              variant === "primary"
                ? "bg-primary group-hover:bg-white"
                : variant === "secondary"
                  ? "bg-white group-hover:bg-white"
                  : variant === "dark"
                    ? "bg-black group-hover:bg-white"
                    : "bg-white group-hover:bg-black",
              "group-hover:w-[15px]",
            )}
          />
        )}

        {/* Top key decoration */}
        <span
          className={cn(
            "absolute top-[-2px] left-[10px] h-[2px] w-[25px] transition-all duration-500 group-hover:left-[-2px] group-hover:w-0 z-10",
            showKeys ? "bg-background" : "bg-transparent",
          )}
        />

        {/* Text container */}
        <span
          className={cn(
            "relative z-20 flex items-center gap-2 text-[1.125em] uppercase leading-[1.33333em] transition-all duration-300",
            showLine && "pl-8 group-hover:pl-6",
            variant === "primary"
              ? "text-primary group-hover:text-white"
              : variant === "secondary"
                ? "text-white group-hover:text-white"
                : variant === "dark"
                  ? "text-black group-hover:text-white"
                  : "text-white group-hover:text-black",
          )}
        >
          {innerChildren}
        </span>

        {/* Bottom key 1 decoration */}
        <span
          className={cn(
            "absolute bottom-[-2px] right-[30px] h-[2px] w-[25px] transition-all duration-500 group-hover:right-0 group-hover:w-0 z-10",
            showKeys ? "bg-background" : "bg-transparent",
          )}
        />

        {/* Bottom key 2 decoration */}
        <span
          className={cn(
            "absolute bottom-[-2px] right-[10px] h-[2px] w-[10px] transition-all duration-500 group-hover:right-0 group-hover:w-0 z-10",
            showKeys ? "bg-background" : "bg-transparent",
          )}
        />
      </>
    );

    if (asChild) {
      const child = React.Children.only(children) as React.ReactElement<{
        children?: React.ReactNode;
      }>;
      return (
        <Comp
          className={cn(fancyButtonVariants({ variant, size, className }))}
          ref={ref}
          {...props}
        >
          {React.cloneElement(child, {
            children: renderContent(child.props.children),
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
          } as any)}
        </Comp>
      );
    }

    return (
      <Comp
        className={cn(fancyButtonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {renderContent(children)}
      </Comp>
    );
  },
);
FancyButton.displayName = "FancyButton";

export { FancyButton };

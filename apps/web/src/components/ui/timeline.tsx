import * as React from "react";

import { cn } from "@/lib/utils";

interface TimelineProps extends React.HTMLAttributes<HTMLDivElement> {}

const Timeline = React.forwardRef<HTMLDivElement, TimelineProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("space-y-4", className)} {...props} />
  ),
);
Timeline.displayName = "Timeline";

interface TimelineItemProps extends React.HTMLAttributes<HTMLDivElement> {}

const TimelineItem = React.forwardRef<HTMLDivElement, TimelineItemProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("relative pl-6", className)} {...props} />
  ),
);
TimelineItem.displayName = "TimelineItem";

interface TimelineConnectorProps extends React.HTMLAttributes<HTMLDivElement> {}

const TimelineConnector = React.forwardRef<
  HTMLDivElement,
  TimelineConnectorProps
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("absolute h-full w-px bg-border left-2.5 top-6", className)}
    {...props}
  />
));
TimelineConnector.displayName = "TimelineConnector";

interface TimelineHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

const TimelineHeader = React.forwardRef<HTMLDivElement, TimelineHeaderProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex items-start mb-1", className)}
      {...props}
    />
  ),
);
TimelineHeader.displayName = "TimelineHeader";

interface TimelineIconProps extends React.HTMLAttributes<HTMLDivElement> {}

const TimelineIcon = React.forwardRef<HTMLDivElement, TimelineIconProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "absolute left-0 flex items-center justify-center p-1 z-10",
        className,
      )}
      {...props}
    />
  ),
);
TimelineIcon.displayName = "TimelineIcon";

interface TimelineBodyProps extends React.HTMLAttributes<HTMLDivElement> {}

const TimelineBody = React.forwardRef<HTMLDivElement, TimelineBodyProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("pb-4", className)} {...props} />
  ),
);
TimelineBody.displayName = "TimelineBody";

export {
  Timeline,
  TimelineItem,
  TimelineConnector,
  TimelineHeader,
  TimelineIcon,
  TimelineBody,
};

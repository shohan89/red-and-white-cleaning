import { cn } from "@/lib/utils";

interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  as?: "section" | "div";
}

export function SectionWrapper({
  children,
  className,
  id,
  as: Tag = "section",
}: SectionWrapperProps) {
  return (
    <Tag
      id={id}
      className={cn(
        "w-full px-4 py-16 md:py-24 lg:py-28",
        className
      )}
    >
      <div className="mx-auto max-w-7xl">{children}</div>
    </Tag>
  );
}

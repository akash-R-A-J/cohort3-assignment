export interface IconProps {
  size: "sm" | "md" | "lg";
}

export const iconSizeVariants: Record<IconProps["size"], string> = {
  sm: "size-2",
  md: "size-4",
  lg: "size-6",
};

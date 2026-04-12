type LoaderSize = "sm" | "md" | "lg";

const sizeClassMap: Record<LoaderSize, string> = {
  sm: "h-4 w-4",
  md: "h-5 w-5",
  lg: "h-6 w-6",
};

export default function Loader({ size = "sm", className = "" }: { size?: LoaderSize; className?: string }) {
  return (
    <span className={`relative inline-flex shrink-0 ${sizeClassMap[size]} ${className}`.trim()} aria-hidden="true">
      <span className="absolute inset-0 rounded-full border-2 border-current/25" />
      <span className="absolute inset-0 rounded-full border-2 border-transparent border-t-current border-r-current animate-spin" />
      <span className="absolute inset-[34%] rounded-full bg-current/80 animate-pulse" />
    </span>
  );
}

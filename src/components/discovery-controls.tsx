import { Button, type ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function SketchAction({ className, ...props }: ButtonProps) {
  return (
    <Button
      className={cn(
        "sketch h-auto min-h-11 whitespace-normal px-5 py-3 text-sm font-semibold shadow-none",
        className,
      )}
      {...props}
    />
  );
}

export function EditableText({
  label,
  value,
  onChange,
  rows = 3,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  rows?: number;
}) {
  return (
    <label className="block space-y-2">
      <span className="text-sm font-semibold">{label}</span>
      <textarea
        rows={rows}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="sketch w-full resize-y bg-card px-4 py-3 text-sm leading-relaxed outline-none transition-colors focus:bg-highlight/20 focus:ring-2 focus:ring-ring"
      />
    </label>
  );
}

export function HypothesisTag() {
  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
      <span className="h-2 w-2 rounded-full bg-accent" />
      Hipótesis · sin validar
    </span>
  );
}

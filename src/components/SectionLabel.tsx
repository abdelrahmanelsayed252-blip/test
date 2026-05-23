import { cn } from '@/lib/utils';

type Props = {
  index?: string;
  label: string;
  className?: string;
};

export function SectionLabel({ index, label, className }: Props) {
  return (
    <div
      className={cn(
        'flex items-center gap-3 text-[10px] md:text-[11px] tracking-[0.32em] uppercase opacity-60',
        className
      )}
    >
      {index && <span className="tabular-nums">{index}</span>}
      <span className="w-8 h-px bg-current opacity-40" aria-hidden />
      <span>{label}</span>
    </div>
  );
}

import { cn } from '@/lib/utils';

type LogoProps = {
  className?: string;
  size?: number;
};

/** Wavy "RAW" wordmark in the style of the brand identity. */
export function Logo({ className, size = 56 }: LogoProps) {
  return (
    <svg
      viewBox="0 0 200 80"
      width={size * (200 / 80)}
      height={size}
      role="img"
      aria-label="RAW"
      className={cn('select-none', className)}
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="
          M2 78
          C 0 72, 4 38, 10 12
          C 12 4, 18 0, 22 4
          C 27 10, 30 30, 32 50
          C 33 60, 35 70, 38 78
          L 30 78
          C 28 60, 26 44, 24 32
          C 22 24, 20 22, 19 28
          C 17 38, 16 58, 14 78
          Z

          M 26 50
          C 30 48, 36 47, 40 50
          C 44 53, 46 58, 48 64
          C 50 70, 52 76, 56 78
          L 46 78
          C 43 72, 41 66, 39 62
          C 37 58, 33 56, 28 58
          Z
        "
      />
      <path
        d="
          M 60 78
          C 58 70, 60 38, 64 14
          C 65 8, 68 4, 70 8
          C 72 12, 74 28, 76 48
          C 77 58, 78 70, 80 78
          L 72 78
          C 70 60, 68 42, 66 32
          C 65 26, 64 26, 63 32
          C 62 42, 60 60, 58 78
          Z

          M 84 14
          C 82 36, 80 60, 80 78
          L 88 78
          C 88 60, 90 36, 92 14
          C 92 6, 88 4, 86 8
          C 85 10, 84 12, 84 14
          Z
        "
      />
      <path
        d="
          M 108 78
          C 106 70, 108 38, 112 16
          C 113 10, 116 8, 118 12
          C 120 18, 121 34, 122 50
          C 123 60, 124 70, 126 78
          L 118 78
          C 116 64, 114 50, 112 40
          C 110 32, 108 32, 107 40
          C 106 50, 104 64, 102 78
          Z

          M 130 16
          C 132 38, 134 60, 136 78
          L 144 78
          C 144 60, 146 38, 150 16
          C 151 10, 154 8, 156 12
          C 158 18, 160 36, 162 50
          C 163 60, 164 70, 166 78
          L 158 78
          C 156 64, 154 50, 152 40
          C 150 32, 148 32, 147 40
          C 146 50, 144 64, 142 78
          Z

          M 170 16
          C 172 38, 174 60, 176 78
          L 184 78
          C 184 60, 186 38, 190 16
          C 191 10, 194 8, 196 12
          C 198 18, 200 36, 198 78
          L 190 78
          C 192 60, 192 42, 191 36
          C 190 32, 188 32, 187 36
          C 186 42, 184 60, 184 78
          Z
        "
      />
    </svg>
  );
}

/** Simpler wordmark suitable for headers — clean italic RAW. */
export function Wordmark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        'raw-mark text-current leading-none tracking-tight inline-block',
        className
      )}
      aria-label="RAW"
    >
      RAW
    </span>
  );
}

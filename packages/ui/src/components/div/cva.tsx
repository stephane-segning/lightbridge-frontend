import { cva, type VariantProps } from 'class-variance-authority';

export const divVariants = cva('flex flex-col', {
  variants: {
    pad: {
      none: '',
      sm: 'p-2',
      md: 'p-4',
      lg: 'p-6',
    },
    tone: {
      default: 'bg-transparent',
      surface: 'bg-white',
      muted: 'bg-neutral-100',
    },
    rounded: {
      none: '',
      sm: 'rounded-md',
      md: 'rounded-lg',
      xl: 'rounded-2xl',
    },
  },
  defaultVariants: {
    pad: 'none',
    tone: 'default',
    rounded: 'none',
  },
});

export type DivVariantProps = VariantProps<typeof divVariants>;

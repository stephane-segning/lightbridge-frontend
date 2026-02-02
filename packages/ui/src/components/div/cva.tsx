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
      muted: 'bg-[#f7f7f8]',
      brand: 'bg-[#1d5bff]',
      brandSoft: 'bg-[#e8efff]',
      warningSoft: 'bg-[#fff4e5]',
      successSoft: 'bg-[#e7f9f1]',
    },
    rounded: {
      none: '',
      sm: 'rounded-md',
      md: 'rounded-lg',
      xl: 'rounded-2xl',
      full: 'rounded-full',
    },
    shadow: {
      none: '',
      sm: 'shadow-sm',
      md: 'shadow-md',
      lg: 'shadow-lg',
    },
    size: {
      none: '',
      iconSm: 'h-8 w-8',
      iconMd: 'h-10 w-10',
      iconLg: 'h-12 w-12',
      iconXl: 'h-24 w-24',
    },
    width: {
      auto: '',
      full: 'w-full',
    },
    maxWidth: {
      none: '',
      md: 'max-w-md',
    },
    self: {
      none: '',
      start: 'self-start',
      center: 'self-center',
      end: 'self-end',
      stretch: 'self-stretch',
    },
    align: {
      start: 'items-start',
      center: 'items-center',
      end: 'items-end',
      stretch: 'items-stretch',
    },
    justify: {
      start: 'justify-start',
      center: 'justify-center',
      end: 'justify-end',
      between: 'justify-between',
    },
  },
  defaultVariants: {
    pad: 'none',
    tone: 'default',
    rounded: 'none',
    shadow: 'none',
    size: 'none',
    width: 'auto',
    maxWidth: 'none',
    self: 'none',
    align: 'stretch',
    justify: 'start',
  },
});

export type DivVariantProps = VariantProps<typeof divVariants>;

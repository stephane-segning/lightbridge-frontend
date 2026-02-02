import { cva, type VariantProps } from 'class-variance-authority';

export const buttonVariants = cva('flex-row items-center justify-center', {
  variants: {
    variant: {
      primary: 'bg-[#1d5bff] shadow-md',
      ghost: 'bg-transparent',
      neutral: 'bg-white shadow-sm',
      icon: 'bg-[#111827]',
    },
    size: {
      sm: 'h-9 px-4 rounded-xl',
      md: 'h-10 px-4 rounded-xl',
      lg: 'h-12 px-5 rounded-2xl',
      iconSm: 'h-8 w-8 rounded-full',
      icon: 'h-10 w-10 rounded-full',
    },
    width: {
      auto: '',
      full: 'w-full',
    },
    disabled: {
      true: 'opacity-60',
      false: '',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
    width: 'auto',
  },
});

export const buttonTextVariants = cva('font-semibold', {
  variants: {
    variant: {
      primary: 'text-white',
      ghost: 'text-[#1d5bff]',
      neutral: 'text-[#111827]',
      icon: 'text-white',
    },
    size: {
      sm: 'text-sm',
      md: 'text-sm',
      lg: 'text-base',
      iconSm: 'text-xs',
      icon: 'text-sm',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
});

export type ButtonVariantProps = VariantProps<typeof buttonVariants>;

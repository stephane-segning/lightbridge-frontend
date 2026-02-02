import { cva, type VariantProps } from 'class-variance-authority';

export const buttonVariants = cva(
  'flex-row items-center justify-center rounded-md px-4 py-2',
  {
    variants: {
      variant: {
        primary: 'bg-black',
        ghost: 'bg-transparent border border-black',
      },
      size: {
        sm: 'h-9',
        md: 'h-10',
        lg: 'h-12',
      },
      disabled: {
        true: 'opacity-50',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

export const buttonTextVariants = cva('text-sm font-semibold', {
  variants: {
    variant: {
      primary: 'text-white',
      ghost: 'text-black',
    },
    size: {
      sm: 'text-xs',
      md: 'text-sm',
      lg: 'text-base',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
});

export type ButtonVariantProps = VariantProps<typeof buttonVariants>;

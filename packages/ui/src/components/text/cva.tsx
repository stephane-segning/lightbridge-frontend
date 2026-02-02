import { cva, type VariantProps } from 'class-variance-authority';

export const textVariants = cva('text-neutral-900', {
  variants: {
    intent: {
      eyebrow: 'text-xs uppercase tracking-[0.3em] text-neutral-500',
      title: 'text-2xl font-semibold text-neutral-900',
      body: 'text-sm text-neutral-600',
      bodyStrong: 'text-sm font-semibold text-neutral-900',
      key: 'text-xs text-neutral-500',
      value: 'text-lg font-semibold text-neutral-900',
      caption: 'text-xs text-neutral-500',
    },
    align: {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
    },
  },
  defaultVariants: {
    intent: 'body',
    align: 'left',
  },
});

export type TextVariantProps = VariantProps<typeof textVariants>;

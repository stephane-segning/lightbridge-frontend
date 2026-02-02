import { cva, type VariantProps } from 'class-variance-authority';

export const textVariants = cva('text-[#111827]', {
  variants: {
    intent: {
      eyebrow: 'text-xs uppercase tracking-[0.28em] text-[#9ca3af]',
      title: 'text-2xl font-semibold text-[#111827]',
      body: 'text-base text-[#6b7280]',
      bodyStrong: 'text-base font-semibold text-[#111827]',
      key: 'text-sm text-[#9ca3af]',
      value: 'text-2xl font-semibold text-[#111827]',
      caption: 'text-sm text-[#9ca3af]',
      link: 'text-sm font-semibold text-[#1d5bff]',
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

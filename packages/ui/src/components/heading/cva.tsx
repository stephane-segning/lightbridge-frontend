import { cva, type VariantProps } from 'class-variance-authority';

export const headingVariants = cva('text-[#111827]', {
  variants: {
    tone: {
      title: 'text-2xl',
      subtitle: 'text-base text-[#6b7280]',
    },
    align: {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
    },
  },
  defaultVariants: {
    tone: 'title',
    align: 'left',
  },
});

export type HeadingVariantProps = VariantProps<typeof headingVariants>;

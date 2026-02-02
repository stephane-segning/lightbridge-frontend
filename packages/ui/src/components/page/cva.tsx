import { cva, type VariantProps } from 'class-variance-authority';

export const pageVariants = cva('flex-1 px-6 py-8', {
  variants: {
    tone: {
      muted: 'bg-neutral-50',
      surface: 'bg-white',
    },
  },
  defaultVariants: {
    tone: 'muted',
  },
});

export type PageVariantProps = VariantProps<typeof pageVariants>;

import { cva, type VariantProps } from 'class-variance-authority';

export const navItemVariants = cva('', {
  variants: {
    placement: {
      sidebar: 'rounded-md px-3 py-2',
      bottom: 'px-4 py-2',
    },
    active: {
      true: '',
      false: '',
    },
  },
  compoundVariants: [
    { placement: 'sidebar', active: true, className: 'bg-black' },
    { placement: 'sidebar', active: false, className: 'bg-transparent' },
    { placement: 'bottom', active: true, className: 'rounded-full bg-black' },
    { placement: 'bottom', active: false, className: '' },
  ],
  defaultVariants: {
    placement: 'bottom',
    active: false,
  },
});

export const navLabelVariants = cva('text-sm', {
  variants: {
    placement: {
      sidebar: '',
      bottom: '',
    },
    active: {
      true: '',
      false: '',
    },
  },
  compoundVariants: [
    { placement: 'sidebar', active: true, className: 'text-white' },
    { placement: 'sidebar', active: false, className: 'text-neutral-700' },
    { placement: 'bottom', active: true, className: 'text-white' },
    { placement: 'bottom', active: false, className: 'text-neutral-600' },
  ],
  defaultVariants: {
    placement: 'bottom',
    active: false,
  },
});

export type NavItemVariantProps = VariantProps<typeof navItemVariants>;

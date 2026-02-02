import type { PressableProps } from 'react-native';

import type { NavItemVariantProps } from './cva';

export type NavItemProps = PressableProps &
  NavItemVariantProps & {
    label: string;
  };

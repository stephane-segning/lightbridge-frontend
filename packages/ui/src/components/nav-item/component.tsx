import React from 'react';
import { Pressable, Text } from 'react-native';
import type { PressableProps, TextProps } from 'react-native';

import { cn } from '../../cn';
import { navItemVariants, navLabelVariants } from './cva';
import type { NavItemProps } from './types';

const PressableBase = Pressable as React.ComponentType<PressableProps & { className?: string }>;
const TextBase = Text as React.ComponentType<TextProps & { className?: string }>;

export function NavItem({ placement, active, label, ...props }: NavItemProps) {
  return (
    <PressableBase
      accessibilityRole="button"
      className={cn(navItemVariants({ placement, active }))}
      {...props}
    >
      <TextBase className={cn(navLabelVariants({ placement, active }))}>{label}</TextBase>
    </PressableBase>
  );
}

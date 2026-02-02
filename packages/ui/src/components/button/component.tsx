import React from 'react';
import type { PressableProps, TextProps } from 'react-native';
import { Pressable, Text } from 'react-native';

import { cn } from '../../cn';
import { buttonTextVariants, buttonVariants } from './cva';
import type { ButtonProps } from './types';

const PressableBase = Pressable as React.ComponentType<PressableProps & { className?: string }>;
const TextBase = Text as React.ComponentType<TextProps & { className?: string }>;

export function Button({
  textProps,
  variant,
  size,
  width,
  disabled,
  children,
  ...props
}: ButtonProps) {
  const resolvedDisabled = Boolean(disabled);

  return (
    <PressableBase
      accessibilityRole="button"
      disabled={resolvedDisabled}
      className={cn(buttonVariants({ variant, size, width, disabled: resolvedDisabled }))}
      {...props}
    >
      <TextBase className={cn(buttonTextVariants({ variant, size }))} {...textProps}>
        {children}
      </TextBase>
    </PressableBase>
  );
}

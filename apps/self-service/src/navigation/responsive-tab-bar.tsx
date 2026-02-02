import React from 'react';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';

import { NavContainer, NavItem, Stack, Text } from '@lightbridge/ui';
import { useIsDesktop } from './use-is-desktop';
import { useTranslation } from 'react-i18next';

export function ResponsiveTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const isDesktop = useIsDesktop();
  const { t } = useTranslation();

  const getLabel = (routeKey: string, routeName: string) => {
    const options = descriptors[routeKey]?.options;
    if (typeof options?.tabBarLabel === 'string') {
      return options.tabBarLabel;
    }
    if (typeof options?.title === 'string') {
      return options.title;
    }
    return routeName;
  };

  if (isDesktop) {
    return (
      <NavContainer placement="sidebar">
        <Stack gap="md" flex="grow">
          <Text intent="eyebrow">{t('app.brand')}</Text>
          <Stack gap="sm" flex="grow">
            {state.routes.map((route, index) => {
              const label = getLabel(route.key, route.name);
              const isFocused = state.index === index;

              return (
                <NavItem
                  key={route.key}
                  placement="sidebar"
                  active={isFocused}
                  label={label}
                  onPress={() => navigation.navigate(route.name)}
                />
              );
            })}
          </Stack>
        </Stack>
      </NavContainer>
    );
  }

  return (
    <NavContainer placement="bottom">
      {state.routes.map((route, index) => {
        const label = getLabel(route.key, route.name);
        const isFocused = state.index === index;

        return (
          <NavItem
            key={route.key}
            placement="bottom"
            active={isFocused}
            label={label}
            onPress={() => navigation.navigate(route.name)}
          />
        );
      })}
    </NavContainer>
  );
}

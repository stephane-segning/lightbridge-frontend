# Work Method (Codex Agent)

This document describes the working method used to evolve this repository. It is intended to keep contributions consistent, predictable, and aligned with the project's architecture and conventions.

## 1) Guiding Principles

- **Monorepo first**: everything lives under `apps/` and `packages/`. Root contains only workspace tooling.
- **UI-only in app pages**: app screens and views must not import from `react-native` directly. Use UI primitives from `@lightbridge/ui` instead.
- **All classnames inside UI**: Tailwind classes live only inside UI components via `cva` + `cn`. App pages pass variant props, never raw className strings.
- **No plain visible text**: any user-visible text must come from `i18n` using `t('key')`. Literal strings are allowed only for internal labels, logs, or non-UI constants.
- **Kebab-case filenames**: all new files (TS/TSX/JS/JSON/etc.) must be kebab-case. Only keep conventional exceptions (e.g., `App.tsx`).
- **ASCII only**: avoid non-ASCII characters unless the file already uses them.

## 2) Repository Structure

- `apps/self-service` - Expo app (cross-platform UI)
- `apps/self-service/src/app` - Expo Router routes and layouts (file-based routing)
- `apps/self-service/src/configs` - app-level configs (query client, auth config)
- `packages/ui` - UI primitives (RN components with NativeWind, cva, cn)
- `packages/hooks` - service layer hooks (TanStack Query)
- `packages/api-rest` - REST API client package (Hey API codegen target)
- `packages/api-native` - native API wrappers (Linking, Clipboard, etc.)
- `packages/i18n` - centralized i18n config and translations

## 3) Architecture: MVC Layering

### View Layer (App)
- Routes and layouts live in `apps/self-service/src/app` (Expo Router).
- Screens and views live in `apps/self-service/src/screens` and `apps/self-service/src/views`.
- Only composes UI primitives from `@lightbridge/ui`.
- No direct `react-native` imports in route/screen/view components.
- No raw className strings in views/screens.
- No literal user-visible strings; always use `t('...')`.

### Service Layer (Hooks)
- Lives in `packages/hooks`.
- Uses TanStack Query for cache, mutations, and optimistic updates.
- Exposes hooks consumed by screens (e.g., `useApiKeys`, `useTokenUsage`).
- Owns TanStack DB collections and backend sync logic.

### API Layer
- `packages/api-rest`: generated REST client via Hey API (OpenAPI)
- `packages/api-native`: native device/system capabilities, via Expo or RN APIs

### i18n Layer
- `packages/i18n`: i18n initialization and translation resources.
- App uses `I18nProvider` and `useTranslation()` for all visible text.

## 4) UI Component Design Rules

- Each UI component is a folder with:
  - `cva.tsx` for variants
  - `types.tsx` for props
  - `component.tsx` for implementation
  - `index.tsx` for exports
- Classnames are defined only in `cva.tsx` and combined with `cn` in `component.tsx`.
- App-level components use **variants**, not className.

## 5) Navigation Rules

- Use Expo Router (file-based routing).
- Routes and layouts live in `apps/self-service/src/app`.
- Tabs live under `apps/self-service/src/app/(tabs)` and use `Tabs` with `ResponsiveTabBar`.
- Auth routes live under `apps/self-service/src/app/(auth)`.
- Use `Stack`, `Tabs`, `router`, `Link`, and `useLocalSearchParams` from `expo-router` in app code.
- Screen titles and tab labels must be translated.

## 6) Naming and File Conventions

- Filenames: kebab-case (e.g., `api-keys-list-view.tsx`).
- Folder names: kebab-case.
- Exports: use named exports; avoid default exports in packages unless required by a framework.
- Entry is `expo-router/entry` via `apps/self-service/index.js` and `apps/self-service/package.json`.

## 7) Dependency Management

- Root `package.json` owns tooling (eslint/prettier/typescript).
- Each workspace package declares its own runtime dependencies.
- Use `workspace:*` for internal package dependencies.
- API client code is generated via `packages/api-rest` (OpenAPI + Hey API).

## 8) Tooling Expectations

- ESLint + Prettier at root.
- Tailwind config per app, with content paths including `packages/ui`.
- Metro configured to resolve workspace packages.
- i18n configuration centralized in `packages/i18n`.
- Auth persistence: `expo-secure-store` on native, IndexedDB on web.

## 9) Change Checklist

Before finalizing changes:

- [ ] No `react-native` imports in app views/screens.
- [ ] No `className` props in app views/screens.
- [ ] No literal user-visible strings in views/screens/navigation.
- [ ] New files are kebab-case.
- [ ] UI components use `cva` + `cn`.
- [ ] Hooks live in `packages/hooks`.
- [ ] API logic is in `packages/api-rest` or `packages/api-native`.
- [ ] Routes live in `apps/self-service/src/app`.

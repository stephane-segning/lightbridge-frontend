# Work Method (Codex Agent)

This document describes the working method used to evolve this repository. It is intended to keep contributions consistent, predictable, and aligned with the project's architecture and conventions.

## 1) Guiding Principles

- **Monorepo first**: everything lives under `apps/` and `packages/`. Root contains only workspace tooling.
- **UI-only in app pages**: app screens and views must not import from `react-native` directly. Use UI primitives from `@lightbridge/ui` instead.
- **All classnames inside UI**: Tailwind classes live only inside UI components via `cva` + `cn`. App pages pass variant props, never raw className strings.
- **Kebab-case filenames**: all new files (TS/TSX/JS/JSON/etc.) must be kebab-case. Only keep conventional exceptions (e.g., `App.tsx`).
- **ASCII only**: avoid non-ASCII characters unless the file already uses them.

## 2) Repository Structure

- `apps/self-service` – Expo app (cross-platform UI)
- `packages/ui` – UI primitives (RN components with NativeWind, cva, cn)
- `packages/hooks` – service layer hooks (TanStack Query)
- `packages/api-rest` – REST API client package (Hey API codegen target)
- `packages/api-native` – native API wrappers (Linking, Clipboard, etc.)

## 3) Architecture: MVC Layering

### View Layer (App)
- Lives in `apps/self-service/src/views` and `apps/self-service/src/screens`.
- Only composes UI primitives from `@lightbridge/ui`.
- No direct `react-native` imports in view/screen components.
- No raw className strings in views/screens.

### Service Layer (Hooks)
- Lives in `packages/hooks`.
- Uses TanStack Query for cache, mutations, and optimistic updates.
- Exposes hooks consumed by screens (e.g., `useApiKeys`, `useTokenUsage`).

### API Layer
- `packages/api-rest`: generated REST client via Hey API (OpenAPI)
- `packages/api-native`: native device/system capabilities, via Expo or RN APIs

## 4) UI Component Design Rules

- Each UI component is a folder with:
  - `cva.tsx` for variants
  - `types.tsx` for props
  - `component.tsx` for implementation
  - `index.tsx` for exports
- Classnames are defined only in `cva.tsx` and combined with `cn` in `component.tsx`.
- App-level components use **variants**, not className.

## 5) Navigation Rules

- Use React Navigation with:
  - bottom tabs for small screens (max 4 tabs)
  - sticky side navigation for large screens
- Navigation composition lives in `apps/self-service/src/navigation`.
- Any layout or styling is done through UI primitives.

## 6) Naming and File Conventions

- Filenames: kebab-case (e.g., `api-keys-list-view.tsx`).
- Folder names: kebab-case.
- Exports: use named exports; avoid default exports in packages unless required by a framework.
- Keep `App.tsx` and `index.js` as framework entrypoints.

## 7) Dependency Management

- Root `package.json` owns tooling (eslint/prettier/typescript).
- Each workspace package declares its own runtime dependencies.
- Use `workspace:*` for internal package dependencies.

## 8) Tooling Expectations

- ESLint + Prettier at root.
- Tailwind config per app, with content paths including `packages/ui`.
- Metro configured to resolve workspace packages.

## 9) Change Checklist

Before finalizing changes:

- [ ] No `react-native` imports in app views/screens.
- [ ] No `className` props in app views/screens.
- [ ] New files are kebab-case.
- [ ] UI components use `cva` + `cn`.
- [ ] Hooks live in `packages/hooks`.
- [ ] API logic is in `packages/api-rest` or `packages/api-native`.

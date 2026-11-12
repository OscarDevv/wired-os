# Components

Shared components of the design system live under `ui/components`, one folder
per component (PascalCase), scaffolded with `pnpm script:component`. Every
component ships as `Name.tsx` + `Name.types.ts` (+ optional `Name.module.scss`).

## Registry

| Component   | Path                          | Description                          |
| ----------- | ----------------------------- | ------------------------------------ |
| `App`       | `ui/components/App`           | App icon surface for the desktop     |
| `File`      | `ui/components/File`          | File node row for the file explorer  |
| `Folder`    | `ui/components/Folder`        | Folder node row with inline dialogs  |
| `NameDialog`| `ui/components/Folder`        | Naming dialog used by `Folder`       |
| `Window`    | `ui/components/Window`        | Floating, draggable window frame     |

All public components are re-exported from `ui/components/index.ts`, so
consumers can import from `@/ui/components` directly.

## Planned components

New components are requested through individual issues under the
[Design System Components](https://github.com/OscarDevv/wired-os/issues/22)
umbrella and are tracked one issue per component. They are not all required -
only the ones actually used by the OS get built, using Chakra UI, Mantine and
Material UI as references.

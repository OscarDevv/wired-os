import * as p from "@clack/prompts"
import pc from "picocolors"

import path from "node:path"
import fs from "node:fs/promises"

p.intro(
  pc.bold(
    pc.bgYellow("Wired OS Scripts") +
      " • " +
      pc.yellow("Creating a UI Component"),
  ),
)

function cancel(value: unknown) {
  if (p.isCancel(value)) {
    p.cancel("Operation cancelled.")
    process.exit(0)
  }
}

const name = await p.text({
  message: "Component name:",
  placeholder: "Button, Text, Navbar...",

  validate(value) {
    if (value?.trim() === "") {
      return "The component name must have at least one character."
    }

    if (!/^[A-Z]/.test(value!)) {
      return "The component name must start with a capital letter."
    }
  },
})

cancel(name)

const customPath = await p.text({
  message: "Write a custom path (Default is root):",
  initialValue: "/",

  validate(value) {
    if (value?.includes(".")) {
      return "Invalid path. Never try to leave from a folder or write any dots."
    }
  },
})

cancel(customPath)

// Creating the files

const componentsPath = path.join(
  process.cwd(),
  "apps",
  "web",
  "src",
  "ui",
  "components",
)

const componentPath = path.join(
  componentsPath,
  customPath.toString() === "/" ? "" : customPath.toString(),
  name.toString(),
)

await fs.mkdir(componentPath, {
  recursive: true,
})

const n = name.toString()

const files = {
  [`${n}.tsx`]: `import styles from "./${n}.module.scss"
import type { ${n}Props } from "./${n}.types.ts"

export function ${n}({ children }: ${n}Props) {
  return (
    <>
      <p className={styles.${n}}>Component: ${n}</p>
      {children}
    </>
  )
}`,

  [`${n}.module.scss`]: `.${n} {
  color: red;
}`,

  [`${n}.types.ts`]: `import type { ReactNode } from "react"

export interface ${n}Props {
  children: ReactNode;
}`,
}

for (const [fileName, content] of Object.entries(files)) {
  await fs.writeFile(path.join(componentPath, fileName), content)
}

p.outro("Component created at " + path.join(componentPath, n + ".tsx"))

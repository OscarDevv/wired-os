import { useFileSystemStore } from "@/app/stores/useFileSystemStore.ts"
import styles from "./File.module.scss"
import type { FileProps } from "./File.types.ts"
import { Stack } from "../layout/Stack/Stack.tsx"
import { Text } from "../typography/Text/Text.tsx"
import { useState } from "react"
import { Button } from "../controls/Button/Button.tsx"
import { ContextMenu } from "../ContextMenu/ContextMenu.tsx"
import { readName } from "../Folder/readName.ts"
import { createPortal } from "react-dom"

const FILE_ICONS: Record<string, string> = {
  txt: "document.svg",
  html: "html.svg",
  css: "css.svg",
  js: "javascript.svg",
  png: "image.svg",
  jpg: "image.svg",
  jpeg: "image.svg",
  md: "markdown.svg",
}

function getExtension(name: string): string {
  const i = name.lastIndexOf(".")
  return i > 0 ? name.slice(i + 1).toLowerCase() : ""
}

function getIcon(ext: string): string {
  const icon = Object.hasOwn(FILE_ICONS, ext) ? FILE_ICONS[ext] : "document.svg"
  return `/icons/${icon}`
}

export function File({ id }: FileProps) {
  const [isRenaming, setIsRenaming] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const file = useFileSystemStore((s) => s.getNode(id))
  const focusNode = useFileSystemStore((s) => s.focusNode)
  const renameNode = useFileSystemStore((s) => s.renameNode)
  const deleteNode = useFileSystemStore((s) => s.deleteNode)

  if (!file) return null

  const ext = getExtension(file.name)

  return (
    <>
      <ContextMenu
        items={[
          [
            {
              label: "Rename File",
              onClick: () => setIsRenaming(true),
            },
            {
              label: "Delete File",
              onClick: () => setIsDeleting(true),
            },
          ],
        ]}
      >
        <Stack gap="md" className={styles.file} onClick={() => focusNode(id)}>
          <img src={getIcon(ext)} alt={`${ext || "text"} icon`} />

          {isRenaming ? (
            <form
              onSubmit={(e) => {
                const name = readName(e)
                if (name) renameNode(id, name)
                setIsRenaming(false)
              }}
            >
              <input
                name="name"
                defaultValue={file.name}
                autoFocus
                required
                onBlur={() => setIsRenaming(false)}
              />
            </form>
          ) : (
            <Text>{file.name}</Text>
          )}
        </Stack>
      </ContextMenu>

      {isDeleting &&
        createPortal(
          <div>
            <Text size="lg">Are you sure you want to delete {file.name}?</Text>
            <Text>This action is not reversible.</Text>

            <Button onClick={() => deleteNode(id)}>Delete file</Button>
            <Button onClick={() => setIsDeleting(false)}>Cancel</Button>
          </div>,
          document.body,
        )}
    </>
  )
}

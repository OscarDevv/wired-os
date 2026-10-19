import { useFileSystemStore } from "@/app/stores/useFileSystemStore.ts"
import styles from "./File.module.scss"
import type { FileProps } from "./File.types.ts"
import { Stack } from "../layout/Stack/Stack.tsx"
import { Text } from "../typography/Text/Text.tsx"
import { useState, type SubmitEvent } from "react"
import { Button } from "../controls/Button/Button.tsx"

const FILE_ICONS: Record<string, string> = {
  txt: "document.svg",
  html: "html.svg",
  css: "css.svg",
  js: "javascript.svg",
  png: "image.svg",
  jpg: "image.svg",
  jpeg: "image.svg",
  md: "markdown.svg"
}

function getIcon(type: string): string {
  for (const key in FILE_ICONS){
    if (!Object.hasOwn(FILE_ICONS, key)) continue

    const element = FILE_ICONS[key]
    if (type === key) {
      return `/icons/${element}`
    }
  }

  return `/icons/document.svg`
}

export function File({ id }: FileProps) {
  const [isRenaming, setIsRenaming] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const { getFile, focusNode, renameFile, deleteFile } = useFileSystemStore()
  const file = getFile(id)

  if (!file) return null

  const fileType = file.name.split(".").at(-1)

  if (!fileType) {
    renameFile(file.id, `${file.name}.txt`)
  }

  const fileIconPath = getIcon(fileType!);

  function setNewFileName(e: SubmitEvent<HTMLInputElement>) {
    e.preventDefault()
    setIsRenaming(false)
    renameFile(id, e.target.value)
  }

  return (
    <>
      <Stack gap="md" direction="column" justify="center" className={styles.file} onClick={() => focusNode(id)}>
        <img src={fileIconPath} alt={`${fileType} icon`} />

        {isRenaming ? <input onSubmit={setNewFileName} onBlur={() => setIsRenaming(false)} /> :

        <Text>{file.name}</Text>
        }

        <div className={styles.fileMenu}>
          <ul>
            <li onClick={() => setIsRenaming(true)}>Rename</li>
            <li onClick={() => setIsDeleting(true)}>Delete</li>
          </ul>
        </div>
      </Stack>

      {isDeleting && (
        <div>
          <Text size="lg">Are you sure you want to delete {file.name}?</Text>
          <Text>This action is not reversible.</Text>

          <Button onClick={() => deleteFile(id)}>Delete file</Button>
          <Button onClick={() => setIsDeleting(false)}>Cancel</Button>
        </div>
      )}
    </>
  )
}

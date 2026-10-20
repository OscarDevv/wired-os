import { useFileSystemStore } from "@/app/stores/useFileSystemStore.ts"
import styles from "./Folder.module.scss"
import type { FolderProps } from "./Folder.types.ts"
import { Stack } from "../layout/Stack/Stack.tsx"
import { useState, type SubmitEvent } from "react"
import { Text } from "../typography/Text/Text.tsx"
import { Heading } from "../typography/Heading/Heading.tsx"
import { Button } from "../controls/Button/Button.tsx"

export function Folder({ id }: FolderProps) {
  const [isCreatingFile, setIsCreatingFile] = useState(false)
  const [isCreatingFolder, setIsCreatingFolder] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isRenaming, setIsRenaming] = useState(false)

  const {
    getFolder,
    createFile,
    createFolder,
    deleteFolder,
    focusNode,
    renameFolder,
  } = useFileSystemStore()
  const folder = getFolder(id)

  if (!folder) return null

  function setNewFolderName(e: SubmitEvent<HTMLInputElement>) {
    e.preventDefault()
    setIsRenaming(false)
    renameFolder(id, e.target.value)
  }

  return (
    <>
      <Stack
        gap="md"
        direction="column"
        justify="center"
        className={styles.folder}
        onClick={() => focusNode(id)}
      >
        <img src="/icons/folder.svg" alt="Folder icon" />

        {isRenaming ? (
          <input
            onSubmit={setNewFolderName}
            onBlur={() => setIsRenaming(false)}
          />
        ) : (
          <Text>{folder.name}</Text>
        )}

        <div className={styles.folderMenu}>
          <ul>
            <li onClick={() => setIsCreatingFile(true)}>Create file</li>
            <li onClick={() => setIsCreatingFolder(true)}>Create folder</li>
            <li onClick={() => setIsDeleting(true)}>Delete folder</li>
            <li onClick={() => setIsRenaming(true)}>Rename folder</li>
          </ul>
        </div>
      </Stack>

      {isCreatingFile && (
        <div>
          <Heading>Creating a new file</Heading>

          <Text>Type the new file name:</Text>
          <input
            required={true}
            onSubmit={(e) =>
              createFile(id, {
                name: e.target.value,
                focused: false,
              })
            }
          />
        </div>
      )}

      {isCreatingFolder && (
        <div>
          <Heading>Creating a new folder</Heading>

          <Text>Type the new folder name:</Text>
          <input
            required={true}
            onSubmit={(e) => {
              createFolder(id, {
                name: e.target.value,
                focused: false,
              })
            }}
          />
        </div>
      )}

      {isDeleting && (
        <Heading>
          <Heading>Deleting folder</Heading>
          <Text size="lg">Are you sure you want to delete {folder.name}?</Text>
          <Text>This action is not reversible.</Text>

          <Button onClick={() => deleteFolder(id)}>Delete file</Button>
          <Button onClick={() => setIsDeleting(false)}>Cancel</Button>
        </Heading>
      )}

      {isRenaming && (
        <div>
          <Heading>Renaming folder</Heading>
          <Text>Type the new folder name:</Text>

          <input required={true} onSubmit={setNewFolderName} />
        </div>
      )}
    </>
  )
}

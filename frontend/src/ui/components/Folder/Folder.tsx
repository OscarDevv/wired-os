import { useFileSystemStore } from "@/app/stores/useFileSystemStore.ts"
import styles from "./Folder.module.scss"
import type { FolderDialogs, FolderProps } from "./Folder.types.ts"
import { Stack } from "../layout/Stack/Stack.tsx"
import { useState } from "react"
import { Text } from "../typography/Text/Text.tsx"
import { Heading } from "../typography/Heading/Heading.tsx"
import { Button } from "../controls/Button/Button.tsx"
import { ContextMenu } from "../ContextMenu/ContextMenu.tsx"
import { createPortal } from "react-dom"
import { readName } from "./readName.ts"
import { NameDialog } from "./NameDialog.tsx"

export function Folder({ id, onOpen }: FolderProps) {
  const [dialog, setDialog] = useState<FolderDialogs>(null)
  const [isRenaming, setIsRenaming] = useState(false)

  const folder = useFileSystemStore((s) => s.getNode(id))
  const renameNode = useFileSystemStore((s) => s.renameNode)
  const focusNode = useFileSystemStore((s) => s.focusNode)
  const createFile = useFileSystemStore((s) => s.createFile)
  const createFolder = useFileSystemStore((s) => s.createFolder)
  const deleteNode = useFileSystemStore((s) => s.deleteNode)

  if (!folder) return null

  return (
    <>
      <ContextMenu
        items={[
          [
            {
              label: "Create File",
              onClick: () => setDialog("createFile"),
            },
            {
              label: "Create Folder",
              onClick: () => setDialog("createFolder"),
            },
          ],
          [
            {
              label: "Rename Folder",
              onClick: () => setIsRenaming(true),
            },
            {
              label: "Delete Folder",
              onClick: () => setDialog("delete"),
            },
          ],
        ]}
      >
        <Stack
          gap="sm"
          direction="column"
          align="center"
          className={styles.folder}
          onClick={() => focusNode(id)}
          onDoubleClick={onOpen}
        >
          <img src="/icons/folder.svg" alt="Folder icon" className={styles.icon} />

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
                defaultValue={folder.name}
                autoFocus
                required
                onBlur={() => setIsRenaming(false)}
                className={styles.input}
              />
            </form>
          ) : (
            <Text className={styles.name}>{folder.name}</Text>
          )}
        </Stack>
      </ContextMenu>

      {dialog === "createFile" && (
        <NameDialog
          title="Creating a new file"
          onSubmit={(name) => {
            createFile(id, name)
            setDialog(null)
          }}
          onCancel={() => setDialog(null)}
        />
      )}

      {dialog === "createFolder" && (
        <NameDialog
          title="Creating a new folder"
          onSubmit={(name) => {
            createFolder(id, name)
            setDialog(null)
          }}
          onCancel={() => setDialog(null)}
        />
      )}

      {dialog === "delete" &&
        createPortal(
          <div className={styles.modal}>
            <Heading>Deleting folder</Heading>
            <Text size="lg">Are you sure you want to delete {folder.name}?</Text>
            <Text>This action is not reversible.</Text>

            <Button onClick={() => deleteNode(id)}>Delete folder</Button>
            <Button onClick={() => setDialog(null)}>Cancel</Button>
          </div>,
          document.body,
        )}
    </>
  )
}

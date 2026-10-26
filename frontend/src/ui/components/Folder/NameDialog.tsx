import { createPortal } from "react-dom"
import type { FolderNameDialogProps } from "./Folder.types"
import { Heading } from "../typography/Heading/Heading"
import { Button } from "../controls/Button/Button"
import { Text } from "../typography/Text/Text"
import { readName } from "./readName"
import styles from "./Folder.module.scss"

export function NameDialog({ title, onSubmit, onCancel }: FolderNameDialogProps) {
  return createPortal(
    <div className={styles.modal}>
      <Heading>{title}</Heading>

      <form
        onSubmit={(e) => {
          const name = readName(e)
          if (name) onSubmit(name)
        }}
      >
        <Text>Type the name:</Text>
        <input name="name" autoFocus required />

        <Button type="submit">Create</Button>
        <Button type="button" onClick={onCancel}>
          Cancel
        </Button>
      </form>
    </div>,
    document.body,
  )
}

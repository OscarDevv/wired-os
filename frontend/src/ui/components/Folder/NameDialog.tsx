import { Button, Dialog, Input, Portal, Text } from "@chakra-ui/react"
import type { FolderNameDialogProps } from "./Folder.types"
import { readName } from "./readName"
import { useState } from "react"

export function NameDialog({ title, onSubmit, onCancel }: FolderNameDialogProps) {
  const [open, setOpen] = useState(true)

  return (
    <Portal>
      <Dialog.Root open={open} onOpenChange={(e) => setOpen(e.open)}>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.CloseTrigger />
            <Dialog.Header>
              <Dialog.Title>{title}</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <form
                onSubmit={(e) => {
                  const name = readName(e)
                  if (name) onSubmit(name)
                }}
              >
                <Text>Type the name:</Text>
                <Input name="name" autoFocus required />
              </form>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button type="submit">Create</Button>
              </Dialog.ActionTrigger>
              <Dialog.ActionTrigger asChild>
                <Button type="button" onClick={onCancel}>
                  Cancel
                </Button>
              </Dialog.ActionTrigger>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Dialog.Root>
    </Portal>
  )
}

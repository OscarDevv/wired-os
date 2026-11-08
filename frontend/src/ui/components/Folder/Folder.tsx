import { useFileSystemStore } from "@/app/stores/useFileSystemStore.ts"
import type { FolderDialogs, FolderProps } from "./Folder.types.ts"
import { useState } from "react"
import { readName } from "./readName.ts"
import { Center, Image, Input, Menu, Button, Dialog, Portal, Text } from "@chakra-ui/react"
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
      <Menu.Root>
        <Menu.ContextTrigger>
          <Center
            onDoubleClick={onOpen}
            flexDirection="column"
            gap="4px"
            onClick={() => focusNode(id)}
            onBlur={() => focusNode(null)}
            p="8px"
            rounded="16px"
            w="115px"
            h="115px"
            border="1px solid transparent"
            transition="all 0.2s"
            _hover={{ bg: "whiteAlpha.300", borderColor: "whiteAlpha.500" }}
          >
            <Image src="/icons/folder.svg" alt="Folder icon" width="50px" h="50px" />

            {isRenaming ? (
              <form
                onSubmit={(e) => {
                  const name = readName(e)
                  if (name) renameNode(id, name)
                  setIsRenaming(false)
                }}
              >
                <Input
                  name="name"
                  defaultValue={folder.name}
                  autoFocus
                  required
                  h="fit-content"
                  py="4px"
                  color="whiteAlpha.800"
                  borderColor="gray.500"
                  onBlur={() => setIsRenaming(false)}
                />
              </form>
            ) : (
              <Text color="whiteAlpha.800" truncate w="95px">
                {folder.name}
              </Text>
            )}
          </Center>
        </Menu.ContextTrigger>
        <Portal>
          <Menu.Positioner>
            <Menu.Content bg="gray.800" border="1px solid {colors.gray.600}">
              <Menu.ItemGroup>
                <Menu.Item
                  color="whiteAlpha.800"
                  cursor="pointer"
                  transition="0.2s"
                  _hover={{ bg: "gray.700" }}
                  value="createFile"
                  onSelect={() => setDialog("createFile")}
                >
                  Create file
                </Menu.Item>
                <Menu.Item
                  color="whiteAlpha.800"
                  cursor="pointer"
                  transition="0.2s"
                  _hover={{ bg: "gray.700" }}
                  value="createFolder"
                  onSelect={() => setDialog("createFolder")}
                >
                  Create folder
                </Menu.Item>
              </Menu.ItemGroup>

              <Menu.Separator />

              <Menu.ItemGroup>
                <Menu.Item
                  color="whiteAlpha.800"
                  cursor="pointer"
                  transition="0.2s"
                  _hover={{ bg: "gray.700" }}
                  value="rename"
                  onSelect={() => setIsRenaming(true)}
                >
                  Rename folder
                </Menu.Item>
                <Menu.Item
                  color="whiteAlpha.800"
                  cursor="pointer"
                  transition="0.2s"
                  _hover={{ bg: "gray.700" }}
                  value="delete"
                  onSelect={() => setDialog("delete")}
                >
                  Delete folder
                </Menu.Item>
              </Menu.ItemGroup>
            </Menu.Content>
          </Menu.Positioner>
        </Portal>
      </Menu.Root>

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

      {dialog === "delete" && (
        <Portal>
          <Dialog.Root
            open={dialog === "delete"}
            onOpenChange={(e) => setDialog(e.open === false ? null : "delete")}
          >
            <Dialog.Backdrop />
            <Dialog.Positioner>
              <Dialog.Content>
                <Dialog.CloseTrigger />
                <Dialog.Header>
                  <Dialog.Title>Deleting folder "{folder.name}"</Dialog.Title>
                </Dialog.Header>
                <Dialog.Body>
                  <Text>Are you sure you want to delete folder "{folder.name}"?</Text>
                  <Text>This action is unreversible.</Text>
                </Dialog.Body>
                <Dialog.Footer>
                  <Dialog.ActionTrigger asChild>
                    <Button onClick={() => setDialog(null)}>Cancel</Button>
                  </Dialog.ActionTrigger>
                  <Dialog.ActionTrigger asChild>
                    <Button onClick={() => deleteNode(id)}>Delete</Button>
                  </Dialog.ActionTrigger>
                </Dialog.Footer>
              </Dialog.Content>
            </Dialog.Positioner>
          </Dialog.Root>
        </Portal>
      )}
    </>
  )
}

import { useFileSystemStore } from "@/app/stores/useFileSystemStore.ts"
import type { FileProps } from "./File.types.ts"
import { useState } from "react"
import { readName } from "../Folder/readName.ts"

import { Center } from "@chakra-ui/react/center"
import { Dialog } from "@chakra-ui/react/dialog"
import { Image } from "@chakra-ui/react"
import { Input } from "@chakra-ui/react/input"
import { Menu } from "@chakra-ui/react/menu"
import { Portal } from "@chakra-ui/react/portal"
import { Text } from "@chakra-ui/react/text"
import { Button } from "@chakra-ui/react/button"

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
      <Menu.Root>
        <Menu.ContextTrigger>
          <Center
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
            <Image src={getIcon(ext)} alt={`${ext || "text"} icon`} width="50px" h="50px" />

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
                  defaultValue={file.name}
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
                {file.name}
              </Text>
            )}
          </Center>
        </Menu.ContextTrigger>
        <Portal>
          <Menu.Positioner>
            <Menu.Content bg="gray.800" border="1px solid {colors.gray.600}">
              <Menu.Item
                color="whiteAlpha.800"
                cursor="pointer"
                transition="0.2s"
                _hover={{ bg: "gray.700" }}
                value="rename"
                onSelect={() => setIsRenaming(true)}
              >
                Rename file
              </Menu.Item>
              <Menu.Item
                color="whiteAlpha.800"
                cursor="pointer"
                transition="0.2s"
                _hover={{ bg: "gray.700" }}
                value="delete"
                onSelect={() => setIsDeleting(true)}
              >
                Delete file
              </Menu.Item>
            </Menu.Content>
          </Menu.Positioner>
        </Portal>
      </Menu.Root>

      {isDeleting && (
        <Portal>
          <Dialog.Root open={isDeleting} onOpenChange={(e) => setIsDeleting(e.open)}>
            <Dialog.Backdrop />
            <Dialog.Positioner>
              <Dialog.Content>
                <Dialog.CloseTrigger />
                <Dialog.Header>
                  <Dialog.Title>Deleting file "{file.name}"</Dialog.Title>
                </Dialog.Header>
                <Dialog.Body>
                  <Text>Are you sure you want to delete file "{file.name}"?</Text>
                  <Text>This action is unreversible.</Text>
                </Dialog.Body>
                <Dialog.Footer>
                  <Dialog.ActionTrigger asChild>
                    <Button onClick={() => setIsDeleting(false)}>Cancel</Button>
                  </Dialog.ActionTrigger>
                  <Dialog.ActionTrigger asChild>
                    <Button
                      onClick={() => {
                        deleteNode(file.id)
                        setIsDeleting(false)
                      }}
                    >
                      Delete
                    </Button>
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

import { useAppsStore } from "@/app/stores/useAppsStore"
import { useFileSystemStore } from "@/app/stores/useFileSystemStore"

import { Box } from "@chakra-ui/react/box"
import { Button, CloseButton } from "@chakra-ui/react/button"
import { Dialog } from "@chakra-ui/react/dialog"
import { Portal } from "@chakra-ui/react/portal"
import { Text } from "@chakra-ui/react/text"
import { HStack } from "@chakra-ui/react/stack"

import { IconArrowLeft, IconPlus, IconTrash } from "@tabler/icons-react"

import { useEffect, useState } from "react"
import { NodeList } from "./NodeList"

function FileExplorer() {
  const createFile = useFileSystemStore((s) => s.createFile)
  const createFolder = useFileSystemStore((s) => s.createFolder)
  const deleteNode = useFileSystemStore((s) => s.deleteNode)
  const focusedId = useFileSystemStore((s) => s.focusedId)
  const getNode = useFileSystemStore((s) => s.getNode)
  const root = useFileSystemStore((s) => s.root)
  const focusNode = useFileSystemStore((s) => s.focusNode)

  const [path, setPath] = useState<string[]>([])

  const [deleteOpen, setDeleteOpen] = useState(false)
  const selectedNode = focusedId ? getNode(focusedId) : undefined

  const currentId = path.at(-1) ?? null
  const currentNode = currentId ? getNode(currentId) : undefined
  const currentFolder = currentNode?.type === "folder" ? currentNode : undefined
  const nodes = currentFolder ? currentFolder.content : root

  useEffect(() => {
    const resetPath = () => setPath([])

    if (currentId && !currentFolder) resetPath()
  }, [currentId, currentFolder])

  function openFolder(id: string) {
    setPath((p) => [...p, id])
    focusNode(null)
  }

  function goBack() {
    setPath((p) => p.slice(0, -1))
    focusNode(null)
  }

  function handleCreateNode(type: "folder" | "file") {
    const parentId = selectedNode?.id ?? currentId ?? null

    if (type === "folder") createFolder(parentId, "New folder")
    else createFile(parentId, "New file")
  }

  return (
    <>
      <HStack w="100%" p="4px">
        <Button size="sm" onClick={goBack} disabled={path.length === 0}>
          <IconArrowLeft />
          <Text>Back</Text>
        </Button>

        <Button size="sm" onClick={() => handleCreateNode("file")}>
          <IconPlus />
          <Text>Create new file</Text>
        </Button>

        <Button size="sm" onClick={() => handleCreateNode("folder")}>
          <IconPlus />
          <Text>Create new folder</Text>
        </Button>

        <Dialog.Root open={deleteOpen} onOpenChange={(e) => setDeleteOpen(e.open)}>
          <Dialog.Trigger asChild>
            <Button size="sm" disabled={!selectedNode}>
              <IconTrash />
              <Text>Delete</Text>
            </Button>
          </Dialog.Trigger>
          <Portal>
            <Dialog.Backdrop />
            <Dialog.Positioner>
              <Dialog.Content>
                <Dialog.Header>
                  <Dialog.Title>Delete "{selectedNode?.name}"</Dialog.Title>
                </Dialog.Header>
                <Dialog.Body>
                  <Text>
                    Are you sure you want to delete the {selectedNode?.type ?? "node"} "
                    {selectedNode?.name}"?
                  </Text>
                  <Text>This action is unreversible.</Text>
                </Dialog.Body>
                <Dialog.Footer>
                  <Dialog.ActionTrigger asChild>
                    <Button onClick={() => setDeleteOpen(false)}>Cancel</Button>
                  </Dialog.ActionTrigger>
                  <Dialog.ActionTrigger asChild>
                    <Button
                      onClick={() => {
                        deleteNode(selectedNode?.id ?? "")
                        setDeleteOpen(false)
                      }}
                    >
                      Delete
                    </Button>
                  </Dialog.ActionTrigger>
                </Dialog.Footer>
                <Dialog.CloseTrigger asChild>
                  <CloseButton size="sm" />
                </Dialog.CloseTrigger>
              </Dialog.Content>
            </Dialog.Positioner>
          </Portal>
        </Dialog.Root>
      </HStack>

      <Text color="whiteAlpha.800" mx="8px" my="8px">
        /{currentFolder?.name ?? ""}
      </Text>

      <Box as="main" flex="1" overflow="hidden" mx="8px">
        <NodeList nodes={nodes} onOpenFolder={openFolder} />
      </Box>
    </>
  )
}

export function FileExplorerInitializer() {
  const register = useAppsStore((s) => s.register)

  useEffect(() => {
    register({
      name: "File Explorer",
      component: FileExplorer,
      fixed: true,
      icon: "", // Temporary iconless
      type: "system",
      description: "Browse your files",
    })
  }, [register])

  return null
}

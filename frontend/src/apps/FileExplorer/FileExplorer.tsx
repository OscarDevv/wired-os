import { useAppsStore } from "@/app/stores/useAppsStore"
import { useFileSystemStore } from "@/app/stores/useFileSystemStore"
import { Button } from "@/ui/components/controls/Button/Button"
import { Stack } from "@/ui/components/layout/Stack/Stack"
import { Heading } from "@/ui/components/typography/Heading/Heading"
import { Text } from "@/ui/components/typography/Text/Text"
import { IconArrowLeft, IconPlus, IconTrash } from "@tabler/icons-react"
import { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import { NodeList } from "./NodeList"
import styles from "./FileExplorer.module.scss"

function FileExplorer() {
  const createFile = useFileSystemStore(s => s.createFile)
  const createFolder = useFileSystemStore(s => s.createFolder)
  const deleteNode = useFileSystemStore(s => s.deleteNode)
  const focusedId = useFileSystemStore(s => s.focusedId)
  const getNode = useFileSystemStore(s => s.getNode)
  const root = useFileSystemStore(s => s.root)
  const focusNode = useFileSystemStore(s => s.focusNode)

  const [isDeleting, setIsDeleting] = useState(false)
  const [path, setPath] = useState<string[]>([])

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
    setPath(p => [...p, id])
    focusNode(null)
  }

  function goBack() {
    setPath(p => p.slice(0, -1))
    focusNode(null)
  }

  function handleCreateNode(type: "folder" | "file") {
    const parentId = selectedNode?.id ?? null

    if (type === "folder") createFolder(parentId, "New folder")
    else createFile(parentId, "New file")
  }

  return (
    <>
      <Stack className={styles.container} direction="column">
        <Stack gap="xs" className={styles.header}>
          <Button size="xs" onClick={goBack} disabled={path.length === 0}>
            <IconArrowLeft />
            <Text>Back</Text>
          </Button>

          <Button size="xs" onClick={() => handleCreateNode("file")}>
            <IconPlus />
            <Text>Create new file</Text>
          </Button>

          <Button size="xs" onClick={() => handleCreateNode("folder")}>
            <IconPlus />
            <Text>Create new folder</Text>
          </Button>

          <Button size="xs" onClick={() => setIsDeleting(true)} disabled={!selectedNode}>
            <IconTrash />
            <Text>Delete</Text>
          </Button>
        </Stack>

        <Text size="md" variant="terminal">/{currentFolder?.name ?? ""}</Text>

        <main>
          <NodeList nodes={nodes} onOpenFolder={openFolder} />
        </main>
      </Stack>

      {isDeleting && createPortal(
        <div>
          <Heading>Deleting {selectedNode?.type} {selectedNode?.name}</Heading>
          <Text size={"lg"}>Are you sure you want to delete {selectedNode?.name}?</Text>
          <Text>This action is not reversible.</Text>

          <Button onClick={() => {
            setIsDeleting(false)
            deleteNode(focusedId || "")
          }}>Delete</Button>
          <Button onClick={() => setIsDeleting(false)}>Cancel</Button>
        </div>,
        document.body
      )}
    </>
  )
}

export function FileExplorerInitializer() {
  const register = useAppsStore(s => s.register)

  useEffect(() => {
    register({
      name: "FileExplorer",
      component: FileExplorer,
      fixed: true,
      icon: "", // Temporary iconless
      type: "system",
      description: "Browse your files"
    })
  }, [register])

  return null
}

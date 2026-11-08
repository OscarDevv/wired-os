import { type FSNode } from "@/app/stores/useFileSystemStore"
import { File } from "@/ui/components/File/File"
import { Folder } from "@/ui/components/Folder/Folder"
import { HStack } from "@chakra-ui/react"

interface NodeListProps {
  nodes: FSNode[]
  onOpenFolder: (id: string) => void
}

export function NodeList({ nodes, onOpenFolder }: NodeListProps) {
  return (
    <HStack gap="4px" flexWrap="wrap" w="100%" h="100%" overflowY="auto" overflowX="hidden">
      {nodes.map((node) =>
        node.type === "folder" ? (
          <Folder key={node.id} id={node.id} onOpen={() => onOpenFolder(node.id)} />
        ) : (
          <File key={node.id} id={node.id} />
        ),
      )}
    </HStack>
  )
}

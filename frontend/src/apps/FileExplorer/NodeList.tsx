import type { FSNode } from "@/app/stores/useFileSystemStore";
import { File } from "@/ui/components/File/File";
import { Folder } from "@/ui/components/Folder/Folder";
import { Stack } from "@/ui/components/layout/Stack/Stack";

interface NodeListProps {
  nodes: FSNode[]
  onOpenFolder: (id: string) => void
}

export function NodeList({ nodes, onOpenFolder }: NodeListProps) {
  return (
    <Stack direction="column" gap="xs">
      {nodes.map((node) =>
        node.type === "folder" ? (
          <Folder key={node.id} id={node.id} onOpen={() => onOpenFolder(node.id)} />
        ) : (
          <File key={node.id} id={node.id} />
        ),
      )}
    </Stack>
  )
}

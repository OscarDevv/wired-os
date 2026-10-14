import { create } from "zustand"

interface FSStore {
  root: FSNode[]

  getFolder: (id: string) => FSFolder | undefined
  createFolder: (
    id: string | null,
    data: Omit<FSFolder, "id" | "created" | "updated" | "type" | "content">,
  ) => void
  renameFolder: (id: string, name: string) => void
  deleteFolder: (id: string) => void

  getFile: (id: string) => FSFile | undefined
  createFile: (
    id: string,
    data: Omit<FSFile, "id" | "created" | "updated" | "type" | "content">,
  ) => void
  renameFile: (id: string, name: string) => void
  deleteFile: (id: string) => void
}

interface FSNodeTime {
  day: number
  month: number
  year: number
  hour: number
  minute: number
  seconds: number
}

interface FSNodeBase {
  id: string
  name: string
  created: FSNodeTime
  updated: FSNodeTime
}

interface FSFolder extends FSNodeBase {
  type: "folder"
  content: FSNode[]
}

interface FSFile extends FSNodeBase {
  type: "file"
  content: string
}

type FSNode = FSFolder | FSFile

function currentDate(): FSNodeTime {
  const date = new Date()

  return {
    day: date.getDate(),
    month: date.getMonth() + 1,
    year: date.getFullYear(),
    hour: date.getHours(),
    minute: date.getMinutes(),
    seconds: date.getSeconds(),
  }
}

function getFolder(nodes: FSNode[], id: string): FSFolder | undefined {
  for (const node of nodes) {
    if (node.type !== "folder") continue
    if (node.id === id) return node

    const folder = getFolder(node.content, id)
    if (folder) return folder
  }

  return undefined
}

function createFolder(
  nodes: FSNode[],
  id: string,
  data: Omit<FSFolder, "id" | "created" | "updated" | "type" | "content">,
): FSNode[] {
  return nodes.map((node) => {
    if (node.type !== "folder") return node

    if (node.id === id) {
      const now = currentDate()

      return {
        ...node,
        content: [
          ...node.content,
          {
            ...data,
            id: crypto.randomUUID(),
            created: now,
            updated: now,
            content: [],
            type: "folder",
          },
        ],
      }
    }

    return {
      ...node,
      content: createFolder(node.content, id, data),
    }
  })
}

function renameFolder(nodes: FSNode[], id: string, name: string): FSNode[] {
  return nodes.map((node) => {
    if (node.type !== "folder") return node

    if (node.id === id) {
      const now = currentDate()

      return {
        ...node,
        name,
        updated: now,
      }
    }

    return {
      ...node,
      content: renameFolder(node.content, id, name),
    }
  })
}

function deleteFolder(nodes: FSNode[], id: string): FSNode[] {
  return nodes
    .filter((node) => {
      return node.type !== "folder" || node.id !== id
    })
    .map((node) => {
      if (node.type !== "folder") {
        return node
      }

      return {
        ...node,
        content: deleteFolder(node.content, id),
      }
    })
}

function getFile(nodes: FSNode[], id: string): FSFile | undefined {
  for (const node of nodes) {
    if (node.type === "file") {
      if (node.id === id) return node

      continue
    }

    const file = getFile(node.content, id)
    if (file) return file
  }

  return undefined
}

function createFile(
  nodes: FSNode[],
  id: string,
  data: Omit<FSFile, "id" | "created" | "updated" | "type" | "content">,
): FSNode[] {
  return nodes.map((node) => {
    if (node.type !== "folder") return node

    if (node.id === id) {
      const now = currentDate()

      return {
        ...node,
        content: [
          ...node.content,
          {
            ...data,
            id: crypto.randomUUID(),
            created: now,
            updated: now,
            content: "",
            type: "file",
          },
        ],
      }
    }

    return {
      ...node,
      content: createFile(node.content, id, data),
    }
  })
}

function renameFile(nodes: FSNode[], id: string, name: string): FSNode[] {
  return nodes.map((node) => {
    if (node.type === "file") {
      if (node.id === id) {
        const now = currentDate()

        return {
          ...node,
          name,
          updated: now,
        }
      }

      return node
    }

    return {
      ...node,
      content: renameFile(node.content, id, name),
    }
  })
}

function deleteFile(nodes: FSNode[], id: string): FSNode[] {
  return nodes
    .filter((node) => {
      return node.type !== "file" || node.id !== id
    })
    .map((node) => {
      if (node.type !== "folder") return node

      return {
        ...node,
        content: deleteFile(node.content, id),
      }
    })
}

export const useFileSystemStore = create<FSStore>((set, get) => ({
  root: [],

  getFolder(id) {
    return getFolder(get().root, id)
  },
  createFolder(id, data) {
    if (id === null) {
      const now = currentDate()

      set((state) => ({
        root: [
          ...state.root,
          {
            id: crypto.randomUUID(),
            name: data.name,
            created: now,
            updated: now,
            type: "folder",
            content: [],
          },
        ],
      }))
      return
    }

    if (!getFolder(get().root, id)) return

    set((state) => ({
      root: createFolder(state.root, id, data),
    }))
  },
  renameFolder(id, name) {
    if (!getFolder(get().root, id)) return

    set((state) => ({
      root: renameFolder(state.root, id, name),
    }))
  },
  deleteFolder(id) {
    if (!getFolder(get().root, id)) return

    set((state) => ({
      root: deleteFolder(state.root, id),
    }))
  },

  getFile(id) {
    return getFile(get().root, id)
  },
  createFile(id, data) {
    if (!getFolder(get().root, id)) return

    set((state) => ({
      root: createFile(state.root, id, data),
    }))
  },
  renameFile(id, name) {
    if (!getFile(get().root, id)) return

    set((state) => ({
      root: renameFile(state.root, id, name),
    }))
  },
  deleteFile(id) {
    if (!getFile(get().root, id)) return

    set((state) => ({
      root: deleteFile(state.root, id),
    }))
  },
}))

import { create } from "zustand"

interface FSStore {
  root: FSNode[]
  focusedId: string | null
  getNode: (id: string) => FSNode | undefined
  createFolder: (id: string | null, name: string) => string
  createFile: (id: string | null, name: string) => string
  renameNode: (id: string, name: string) => string
  deleteNode: (id: string) => string
  focusNode: (id: string | null) => string | null
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

export interface FSFolder extends FSNodeBase {
  type: "folder"
  content: FSNode[]
}

export interface FSFile extends FSNodeBase {
  type: "file"
  content: string
}

export type FSNode = FSFolder | FSFile

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

function findNode(nodes: FSNode[], id: string): FSNode | undefined {
  for (const node of nodes) {
    if (node.id === id) return node
    if (node.type === "folder") {
      const found = findNode(node.content, id)
      if (found) return found
    }
  }
}

function updateNode(
  nodes: FSNode[],
  id: string,
  fn: (node: FSNode) => FSNode,
): FSNode[] {
  return nodes.map((node) => {
    if (node.id === id) return fn(node)
    if (node.type === "folder") {
      return {
        ...node,
        content: updateNode(node.content, id, fn),
      }
    }

    return node
  })
}

function removeNode(nodes: FSNode[], id: string): FSNode[] {
  return nodes
    .filter((node) => node.id !== id)
    .map((node) =>
      node.type === "folder"
        ? { ...node, content: removeNode(node.content, id) }
        : node,
    )
}

function addChild(
  nodes: FSNode[],
  parentId: string | null,
  child: FSNode,
): FSNode[] {
  if (parentId === null) return [...nodes, child]

  return updateNode(nodes, parentId, (node) =>
    node.type === "folder"
      ? {
          ...node,
          content: [...node.content, child],
        }
      : node,
  )
}

export const useFileSystemStore = create<FSStore>((set, get) => ({
  root: [],
  focusedId: null,

  getNode(id) {
    return findNode(get().root, id)
  },
  createFolder(id, name) {
    const date = currentDate()
    const childId = crypto.randomUUID()

    set((state) => ({
      root: addChild(state.root, id, {
        name,
        id: childId,
        created: date,
        updated: date,
        type: "folder",
        content: [],
      }),
    }))

    return childId
  },
  createFile(id, name) {
    const date = currentDate()
    const childId = crypto.randomUUID()

    set((state) => ({
      root: addChild(state.root, id, {
        name,
        id: childId,
        updated: date,
        created: date,
        type: "file",
        content: "",
      }),
    }))

    return childId
  },
  renameNode(id, name) {
    set((state) => ({
      root: updateNode(state.root, id, (node) => ({
        ...node,
        updated: currentDate(),
        name,
      })),
    }))

    return id
  },
  deleteNode(id) {
    set((state) => {
      const root = removeNode(state.root, id)
      const focusedId =
        state.focusedId && findNode(root, state.focusedId)
          ? state.focusedId
          : null

      return { root, focusedId }
    })

    return id
  },
  focusNode(id) {
    set({ focusedId: id })
    return id
  },
}))

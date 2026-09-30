import { createContext, useContext, type ReactNode } from "react";

interface AppsContext {
  apps: App[]
  getApp: (id: string) => App | undefined;
  addApp: (data: Omit<App, "id">) => void;
  removeApp: (id: string) => void;
  updateApp: (id: string, data: Omit<App, "id" | "type" | "children">) => void;
}

export interface App {
  id: string;
  name: string;
  icon: string;
  type: "system" | "normal";
  children: ReactNode
}

export const appsContext = createContext<AppsContext>({
  apps: [],
  getApp(id) { return undefined },
  addApp(data) {},
  removeApp(id) {},
  updateApp(id, data) {},
})

export function useApps() {
  return useContext(appsContext) as AppsContext
}

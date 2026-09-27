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

export const appsContext = createContext<AppsContext | null>(null)

export const useApps = useContext(appsContext) as AppsContext

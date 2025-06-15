import { PublicUsersDtoRole } from "@/model";
import { RouteKey } from "./router";
import { Book, Home, LucideIcon, MessageCircle } from "lucide-react";

export type Role = PublicUsersDtoRole;

export type CustomMenuItem = {
  key: RouteKey | null;
  label: string;
  icon?: LucideIcon;
  type?: "group";
  children?: CustomMenuItem[];
  permissions?: (Role | undefined)[];
};
export interface SubPageMenuItemType {
  key: RouteKey;
  icon: LucideIcon;
}

const menuItems: CustomMenuItem[] = [
  {
    key: "home",
    label: "Trang chủ",
    icon: Home,
  },
  {
    key: "chat",
    label: "Trò chuyện",
    icon: MessageCircle,
  },
  {
    key: "topic",
    label: "Bài học",
    icon: Book,
  },
];

const getMenuItems = (userRole?: Role): CustomMenuItem[] => {
  return menuItems
    .filter((item) =>
      item.permissions ? item.permissions.includes(userRole) : true
    )
    .map((item) => {
      const children = item.children
        ?.filter((child) =>
          child.permissions ? child.permissions.includes(userRole) : true
        )
        .map((child) => ({
          key: child.key,
          label: child.label,
          icon: child.icon,
        }));

      return {
        key: item.key,
        label: item.label,
        icon: item.icon,
        type: item.type,
        children,
      };
    });
};

export { getMenuItems };

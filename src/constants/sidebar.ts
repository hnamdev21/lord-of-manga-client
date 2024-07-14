import {
  FaAddressCard,
  FaBan,
  FaBook,
  FaBookmark,
  FaBox,
  FaChartBar,
  FaComment,
  FaHashtag,
  FaHome,
  FaIdCard,
  FaSearch,
  FaTags,
  FaTrashRestore,
  FaUpload,
  FaUserFriends,
  FaUsersSlash,
  FaWallet,
} from "react-icons/fa";
import { IconType } from "react-icons/lib";

import { FaClockRotateLeft } from "@/components/Icons";

import { DefaultPermissionValue, DefaultRoleValue } from "./default-data";

export type SidebarItem = {
  label: string;
  href: string;
  icon: IconType;
  availableRoles: DefaultRoleValue[];
  availablePermissions: DefaultPermissionValue[];
};

export const SidebarCommonPath = {
  HOME: {
    label: "Home",
    href: "/",
    icon: FaHome,
    availableRoles: [],
    availablePermissions: [],
  },
  COMICS: {
    label: "Search",
    href: "/comics",
    icon: FaSearch,
    availableRoles: [],
    availablePermissions: [],
  },
  LIBRARY: {
    label: "Library",
    href: "/library",
    icon: FaBook,
    availableRoles: [],
    availablePermissions: [],
  },
  READING_HISTORY: {
    label: "Reading History",
    href: "/reading-history",
    icon: FaClockRotateLeft,
    availableRoles: [],
    availablePermissions: [],
  },
};
export type SidebarCommonPath = (typeof SidebarCommonPath)[keyof typeof SidebarCommonPath];

export const SidebarAuthenticatedPath = {
  PROFILE: {
    label: "Profile",
    href: "/profile",
    icon: FaAddressCard,
    availableRoles: [],
    availablePermissions: [],
  },
  UPLOAD: {
    label: "Upload Comic",
    href: "/upload",
    icon: FaUpload,
    availableRoles: [DefaultRoleValue.CREATOR],
    availablePermissions: [DefaultPermissionValue.CREATE_COMIC],
  },
  COMIC_MANAGEMENT: {
    label: "Comic Management",
    href: "/comic-management",
    icon: FaBox,
    availableRoles: [DefaultRoleValue.CREATOR],
    availablePermissions: [DefaultPermissionValue.CREATE_COMIC],
  },
  RECYCLE_BIN: {
    label: "Recycle Bin",
    href: "/recycle-bin",
    icon: FaTrashRestore,
    availableRoles: [DefaultRoleValue.CREATOR],
    availablePermissions: [DefaultPermissionValue.CREATE_COMIC],
  },
  SAVED_COMICS: {
    label: "Saved Comics",
    href: "/saved-comics",
    icon: FaBookmark,
    availableRoles: [],
    availablePermissions: [],
  },
};
export type SidebarPathAuthenticatedPath = (typeof SidebarAuthenticatedPath)[keyof typeof SidebarAuthenticatedPath];

export const SidebarAdminPath = {
  DASHBOARD: {
    label: "Dashboard",
    href: "/admin/dashboard",
    icon: FaChartBar,
    availableRoles: [],
    availablePermissions: [],
  },
  ROLES: {
    label: "Roles",
    href: "/admin/roles",
    icon: FaIdCard,
    availableRoles: [DefaultRoleValue.HUMAN_RESOURCE],
    availablePermissions: [DefaultPermissionValue.USER_MANAGER],
  },
  USERS: {
    label: "Users",
    href: "/admin/users",
    icon: FaUserFriends,
    availableRoles: [DefaultRoleValue.HUMAN_RESOURCE],
    availablePermissions: [DefaultPermissionValue.USER_MANAGER],
  },
  BANNED_USERS: {
    label: "Banned Users",
    href: "/admin/banned-users",
    icon: FaUsersSlash,
    availableRoles: [DefaultRoleValue.HUMAN_RESOURCE],
    availablePermissions: [DefaultPermissionValue.USER_MANAGER],
  },
  CATEGORIES: {
    label: "Categories",
    href: "/admin/categories",
    icon: FaTags,
    availableRoles: [],
    availablePermissions: [],
  },
  TAGS: {
    label: "Tags",
    href: "/admin/tags",
    icon: FaHashtag,
    availableRoles: [],
    availablePermissions: [],
  },
  COMICS: {
    label: "Comics",
    href: "/admin/comics",
    icon: FaBook,
    availableRoles: [DefaultRoleValue.COMIC_CENSOR],
    availablePermissions: [],
  },
  BANNED_COMICS: {
    label: "Banned Comics",
    href: "/admin/banned-comics",
    icon: FaBan,
    availableRoles: [DefaultRoleValue.COMIC_CENSOR],
    availablePermissions: [DefaultPermissionValue.BAN_COMIC],
  },
  RECYCLE_BIN: {
    label: "Recycle Bin",
    href: "/admin/recycle-bin",
    icon: FaTrashRestore,
    availableRoles: [DefaultRoleValue.COMIC_CENSOR],
    availablePermissions: [DefaultPermissionValue.DELETE_COMIC],
  },
  COMMENTS: {
    label: "Comments",
    href: "/admin/comments",
    icon: FaComment,
    availableRoles: [DefaultRoleValue.COMMENT_CENSOR],
    availablePermissions: [DefaultPermissionValue.DISABLE_COMMENT],
  },
  PAYMENTS: {
    label: "Payments",
    href: "/admin/payments",
    icon: FaWallet,
    availableRoles: [],
    availablePermissions: [],
  },
};
export type SidebarAdminPath = (typeof SidebarAdminPath)[keyof typeof SidebarAdminPath];

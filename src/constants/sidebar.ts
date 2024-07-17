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
import Path from "./path";

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
    href: Path.USER.HOME,
    icon: FaHome,
    availableRoles: [],
    availablePermissions: [],
  },
  COMICS: {
    label: "Search",
    href: Path.USER.COMICS,
    icon: FaSearch,
    availableRoles: [],
    availablePermissions: [],
  },
  // LIBRARY: {
  //   label: "Library",
  //   href: "/library",
  //   icon: FaBook,
  //   availableRoles: [],
  //   availablePermissions: [],
  // },
  READING_HISTORY: {
    label: "Reading History",
    href: Path.USER.READING_HISTORY,
    icon: FaClockRotateLeft,
    availableRoles: [],
    availablePermissions: [],
  },
};
export type SidebarCommonPath = (typeof SidebarCommonPath)[keyof typeof SidebarCommonPath];

export const SidebarAuthenticatedPath = {
  PROFILE: {
    label: "Profile",
    href: Path.USER.PROFILE,
    icon: FaAddressCard,
    availableRoles: [],
    availablePermissions: [],
  },
  UPLOAD: {
    label: "Upload Comic",
    href: Path.USER.UPLOAD,
    icon: FaUpload,
    availableRoles: [DefaultRoleValue.CREATOR],
    availablePermissions: [DefaultPermissionValue.CREATE_COMIC],
  },
  COMIC_MANAGEMENT: {
    label: "Comic Management",
    href: Path.USER.COMIC_MANAGEMENT,
    icon: FaBox,
    availableRoles: [DefaultRoleValue.CREATOR],
    availablePermissions: [DefaultPermissionValue.CREATE_COMIC],
  },
  RECYCLE_BIN: {
    label: "Recycle Bin",
    href: Path.USER.RECYCLE_BIN,
    icon: FaTrashRestore,
    availableRoles: [DefaultRoleValue.CREATOR],
    availablePermissions: [DefaultPermissionValue.CREATE_COMIC],
  },
  SAVED_COMICS: {
    label: "Saved Comics",
    href: Path.USER.SAVED_COMICS,
    icon: FaBookmark,
    availableRoles: [],
    availablePermissions: [],
  },
};
export type SidebarPathAuthenticatedPath = (typeof SidebarAuthenticatedPath)[keyof typeof SidebarAuthenticatedPath];

export const SidebarAdminPath = {
  DASHBOARD: {
    label: "Dashboard",
    href: Path.ADMIN.DASHBOARD,
    icon: FaChartBar,
    availableRoles: [],
    availablePermissions: [],
  },
  ROLES: {
    label: "Roles",
    href: Path.ADMIN.ROLES,
    icon: FaIdCard,
    availableRoles: [DefaultRoleValue.HUMAN_RESOURCE],
    availablePermissions: [DefaultPermissionValue.USER_MANAGER],
  },
  USERS: {
    label: "Users",
    href: Path.ADMIN.USERS,
    icon: FaUserFriends,
    availableRoles: [DefaultRoleValue.HUMAN_RESOURCE],
    availablePermissions: [DefaultPermissionValue.USER_MANAGER],
  },
  BANNED_USERS: {
    label: "Banned Users",
    href: Path.ADMIN.BANNED_USERS,
    icon: FaUsersSlash,
    availableRoles: [DefaultRoleValue.HUMAN_RESOURCE],
    availablePermissions: [DefaultPermissionValue.USER_MANAGER],
  },
  CATEGORIES: {
    label: "Categories",
    href: Path.ADMIN.CATEGORIES,
    icon: FaTags,
    availableRoles: [],
    availablePermissions: [],
  },
  TAGS: {
    label: "Tags",
    href: Path.ADMIN.TAGS,
    icon: FaHashtag,
    availableRoles: [],
    availablePermissions: [],
  },
  COMICS: {
    label: "Comics",
    href: Path.ADMIN.COMICS,
    icon: FaBook,
    availableRoles: [DefaultRoleValue.COMIC_CENSOR],
    availablePermissions: [],
  },
  BANNED_COMICS: {
    label: "Banned Comics",
    href: Path.ADMIN.BANNED_COMICS,
    icon: FaBan,
    availableRoles: [DefaultRoleValue.COMIC_CENSOR],
    availablePermissions: [DefaultPermissionValue.BAN_COMIC],
  },
  RECYCLE_BIN: {
    label: "Recycle Bin",
    href: Path.ADMIN.RECYCLE_BIN,
    icon: FaTrashRestore,
    availableRoles: [DefaultRoleValue.COMIC_CENSOR],
    availablePermissions: [DefaultPermissionValue.DELETE_COMIC],
  },
  COMMENTS: {
    label: "Comments",
    href: Path.ADMIN.COMMENTS,
    icon: FaComment,
    availableRoles: [DefaultRoleValue.COMMENT_CENSOR],
    availablePermissions: [DefaultPermissionValue.DISABLE_COMMENT],
  },
  PAYMENTS: {
    label: "Payments",
    href: Path.ADMIN.PAYMENTS,
    icon: FaWallet,
    availableRoles: [],
    availablePermissions: [],
  },
};
export type SidebarAdminPath = (typeof SidebarAdminPath)[keyof typeof SidebarAdminPath];

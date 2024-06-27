import {
  FaAddressCard,
  FaBook,
  FaBookmark,
  FaBox,
  FaCcVisa,
  FaChartBar,
  FaClock,
  FaComment,
  FaHome,
  FaSearch,
  FaTag,
  FaTags,
  FaTrashRestore,
  FaUpload,
  FaUserFriends,
} from "react-icons/fa";
import { IconType } from "react-icons/lib";

export type SidebarItem = {
  label: string;
  href: string;
  icon: IconType;
};

export const SidebarCommonPath = {
  HOME: {
    label: "Home",
    href: "/",
    icon: FaHome,
  } as const,
  COMICS: {
    label: "Search",
    href: "/comics",
    icon: FaSearch,
  } as const,
  LIBRARY: {
    label: "Library",
    href: "/library",
    icon: FaBook,
  } as const,

  READING_HISTORY: {
    label: "Reading History",
    href: "/reading-history",
    icon: FaClock,
  } as const,
} as const;
export type SidebarCommonPath = (typeof SidebarCommonPath)[keyof typeof SidebarCommonPath];

export const SidebarAuthenticatedPath = {
  PROFILE: {
    label: "Profile",
    href: "/profile",
    icon: FaAddressCard,
  } as const,
  UPLOAD: {
    label: "Upload Comic",
    href: "/upload",
    icon: FaUpload,
  } as const,
  COMIC_MANAGEMENT: {
    label: "Comic Management",
    href: "/comic-management",
    icon: FaBox,
  } as const,
  RECYCLE_BIN: {
    label: "Recycle Bin",
    href: "/recycle-bin",
    icon: FaTrashRestore,
  } as const,

  SAVED_COMICS: {
    label: "Saved Comics",
    href: "/saved-comics",
    icon: FaBookmark,
  } as const,
};
export type SidebarPathAuthenticatedPath = (typeof SidebarAuthenticatedPath)[keyof typeof SidebarAuthenticatedPath];

export const SidebarAdminPath = {
  DASHBOARD: {
    label: "Dashboard",
    href: "/admin/dashboard",
    icon: FaChartBar,
  } as const,
  USERS: {
    label: "Users",
    href: "/admin/users",
    icon: FaUserFriends,
  } as const,

  CATEGORIES: {
    label: "Categories",
    href: "/admin/categories",
    icon: FaTags,
  } as const,
  TAGS: {
    label: "Tags",
    href: "/admin/tags",
    icon: FaTag,
  } as const,
  COMICS: {
    label: "Comics",
    href: "/admin/comics",
    icon: FaBook,
  } as const,
  COMMENTS: {
    label: "Comments",
    href: "/admin/comments",
    icon: FaComment,
  } as const,
  PAYMENTS: {
    label: "Payments",
    href: "/admin/payments",
    icon: FaCcVisa,
  } as const,
};
export type SidebarAdminPath = (typeof SidebarAdminPath)[keyof typeof SidebarAdminPath];

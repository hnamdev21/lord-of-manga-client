import { FaBook, FaBookmark, FaBox, FaClock, FaHome, FaSearch, FaUpload, FaUser } from "react-icons/fa";

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
    icon: FaUser,
  } as const,
  COMIC_MANAGEMENT: {
    label: "Comic Management",
    href: "/comic-management",
    icon: FaBox,
  } as const,
  UPLOAD: {
    label: "Upload Comic",
    href: "/upload",
    icon: FaUpload,
  } as const,
  SAVED_COMICS: {
    label: "Saved Comics",
    href: "/saved-comics",
    icon: FaBookmark,
  } as const,
};
export type SidebarPathAuthenticatedPath = (typeof SidebarAuthenticatedPath)[keyof typeof SidebarAuthenticatedPath];

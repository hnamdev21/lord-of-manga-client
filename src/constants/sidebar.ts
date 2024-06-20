import { FaBookmark, FaBox, FaClock, FaHome, FaSearch, FaUpload } from "react-icons/fa";

const SidebarPath = {
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
  // LIBRARY: {
  //   label: "Library",
  //   href: "/library",
  //   icon: FaBox,
  // } as const,
  SAVED_COMICS: {
    label: "Saved Comics",
    href: "/saved-comics",
    icon: FaBookmark,
  } as const,
  READING_HISTORY: {
    label: "Reading History",
    href: "/reading-history",
    icon: FaClock,
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
} as const;

export type SidebarPath = (typeof SidebarPath)[keyof typeof SidebarPath];

export default SidebarPath;

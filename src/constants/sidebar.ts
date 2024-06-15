import { FaBook, FaBookmark, FaCalendarTimes, FaHome } from "react-icons/fa";

const SidebarPath = {
  HOME: {
    label: "Home",
    href: "/",
    icon: FaHome,
  } as const,
  COMICS: {
    label: "Library",
    href: "/library",
    icon: FaBook,
  } as const,
  SAVED_COMICS: {
    label: "Saved",
    href: "/saved-comics",
    icon: FaBookmark,
  } as const,
  READING_HISTORY: {
    label: "Reading history",
    href: "/reading-istory",
    icon: FaCalendarTimes,
  } as const,
} as const;

export type SidebarPath = (typeof SidebarPath)[keyof typeof SidebarPath];

export default SidebarPath;

import { FaBook, FaBookmark, FaCalendarTimes, FaHome } from "react-icons/fa";

const SidebarPath = {
  HOME: {
    label: "Home",
    href: "/",
    icon: FaHome,
  } as const,
  COMICS: {
    label: "Comics",
    href: "/comics",
    icon: FaBook,
  } as const,
  SAVED_COMICS: {
    label: "Saved comics",
    href: "/saved-comics",
    icon: FaBookmark,
  } as const,
  READING_HISTORY: {
    label: "Reading history",
    href: "/reading-history",
    icon: FaCalendarTimes,
  } as const,
} as const;

export type SidebarPath = (typeof SidebarPath)[keyof typeof SidebarPath];

export default SidebarPath;

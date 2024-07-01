import { GenderMapping } from "./mapping";

export const GENDER_OPTIONS = Object.entries(GenderMapping).map(([key, value]) => ({
  label: value,
  value: key,
}));

export const ORDER_BY_OPTIONS: {
  label: string;
  value: "all" | "createdAt" | "updatedAt" | "title" | "price" | "viewCount" | "searchCount" | "likeCount";
}[] = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Newest",
    value: "createdAt",
  },
  {
    label: "Most viewed",
    value: "viewCount",
  },
  {
    label: "Most liked",
    value: "likeCount",
  },
  {
    label: "Most searched",
    value: "searchCount",
  },
];

export const FILTER_COMIC_TYPE_OPTIONS: {
  label: string;
  value: "all" | "FREE" | "PAID_ONCE" | "PAID_PER_CHAPTER";
}[] = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Free",
    value: "FREE",
  },
  {
    label: "Paid once",
    value: "PAID_ONCE",
  },
  {
    label: "Paid per chapter",
    value: "PAID_PER_CHAPTER",
  },
];

export const COMIC_TYPE_OPTIONS = [
  {
    label: "Free",
    value: "FREE",
  },
  {
    label: "Paid once",
    value: "PAID_ONCE",
  },
  {
    label: "Paid per chapter",
    value: "PAID_PER_CHAPTER",
  },
];

export const CHAPTER_TYPE_OPTIONS = [
  {
    label: "Free",
    value: "FREE",
  },
  {
    label: "Paid",
    value: "PAID",
  },
];

import { GenderMapping } from "./mapping";

export const GenderOptions = Object.entries(GenderMapping).map(([key, value]) => ({
  label: value,
  value: key,
}));

export const OrderByOptions: {
  label: string;
  value: "all" | "createdAt" | "updatedAt" | "title" | "price" | "viewCount" | "searchCount" | "likeCount";
}[] = [
  {
    label: "All",
    value: "all",
  } as const,
  {
    label: "Newest",
    value: "createdAt",
  } as const,
  {
    label: "Most viewed",
    value: "viewCount",
  } as const,
  {
    label: "Most liked",
    value: "likeCount",
  } as const,
  {
    label: "Most searched",
    value: "searchCount",
  } as const,
];

export const FilterComicTypeOptions: {
  label: string;
  value: "all" | "FREE" | "PAID_ONCE" | "PAID_PER_CHAPTER";
}[] = [
  {
    label: "All",
    value: "all",
  } as const,
  {
    label: "Free",
    value: "FREE",
  } as const,
  {
    label: "Paid once",
    value: "PAID_ONCE",
  } as const,
  {
    label: "Paid per chapter",
    value: "PAID_PER_CHAPTER",
  } as const,
];

export const comicTypeOptions = [
  {
    label: "Free",
    value: "FREE",
  } as const,
  {
    label: "Paid once",
    value: "PAID_ONCE",
  } as const,
  {
    label: "Paid per chapter",
    value: "PAID_PER_CHAPTER",
  } as const,
] as const;

export const chapterTypeOptions = [
  {
    label: "Free",
    value: "FREE",
  } as const,
  {
    label: "Paid",
    value: "PAID",
  } as const,
] as const;

import { GenderMapping } from "./mapping";

type Option = {
  label: string;
  value: string;
};

export const genderOptions: Option[] = Object.entries(GenderMapping).map(([key, value]) => ({
  label: value,
  value: key,
}));

export const orderByOptions: Option[] = [
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

export const filterComicTypeOptions: Option[] = [
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
] as const;

export const comicTypeOptions: Option[] = [
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

export const chapterTypeOptions: Option[] = [
  {
    label: "Free",
    value: "FREE",
  } as const,
  {
    label: "Paid",
    value: "PAID",
  } as const,
] as const;

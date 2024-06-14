import { numberFormatterRegex } from "@Constants/regex";

export const numberFormatter = (value: number) => {
  return `${value}`.replace(numberFormatterRegex, ",");
};

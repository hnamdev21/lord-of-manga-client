import { numberFormatterRegex } from "@Constants/regex";

export const numberFormatter = (value: number) => {
  return `${value}`.replace(numberFormatterRegex, ",");
};

export const timestampToDateTime = (timestamp: string) => {
  return new Date(timestamp).toLocaleDateString("en-GB");
};

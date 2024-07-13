import { numberFormatterRegex } from "@Constants/regex";

export const numberFormatter = (value: number) => {
  return `${value}`.replace(numberFormatterRegex, ",");
};

export const numberToCurrency = (value: number) => {
  return value.toLocaleString("vi-VI", {
    style: "currency",
    currency: "VND",
    currencyDisplay: "symbol",
  });
};

export const timestampToDateTime = (timestamp: string | null) => {
  if (!timestamp) return "";

  return new Date(timestamp).toLocaleDateString("vi-VI", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
};

export const conciseText = (text: string, maxLength: number) => {
  return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
};

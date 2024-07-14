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

// Example: toReadable("hello_world") => "Hello World"
export const toReadable = (text: string) => {
  return text
    .split("_")
    .map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

// Example: toSnakeCase("hello world") => "hello_world"
export const toSnakeCase = (text: string) => {
  return text
    .split(" ")
    .map((word) => word.toLowerCase())
    .join("_");
};

// Example: toKebabCase("hello world") => "hello-world"
export const toKebabCase = (text: string) => {
  return text
    .split(" ")
    .map((word) => word.toLowerCase())
    .join("-");
};

// Example: toCamelCase("hello world") => "helloWorld"
export const toCamelCase = (text: string) => {
  return text
    .split(" ")
    .map((word, index) => (index === 0 ? word.toLowerCase() : word[0].toUpperCase() + word.slice(1).toLowerCase()))
    .join("");
};

// Example: toPascalCase("hello world") => "HelloWorld"
export const toPascalCase = (text: string) => {
  return text
    .split(" ")
    .map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase())
    .join("");
};

// Example: toCapitalCase("hello world") => "Hello world"
export const toCapitalCase = (text: string) => {
  return text[0].toUpperCase() + text.slice(1).toLowerCase();
};

// Example: toUpperCaseWithUnderscores("hello world") => "HELLO_WORLD"
export const toUpperCaseWithUnderscores = (text: string) => {
  return text.toUpperCase().split(" ").join("_");
};

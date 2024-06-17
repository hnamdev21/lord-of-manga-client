export const formDataToQuery = (data: Record<string, string | number>, ignoreData?: Record<string, string | number>) => {
  return Object.keys(data)
    .map((key) => {
      if (ignoreData && data[key] === ignoreData[key]) {
        return;
      }

      if (typeof data[key] === "number") {
        return `${key}=${data[key]}`;
      }

      if (data[key]) {
        return `${key}=${data[key]}`;
      }
    })
    .filter((item) => item)
    .join("&");
};

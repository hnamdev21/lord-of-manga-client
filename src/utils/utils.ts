export const fromObjetToQuery = (data: Record<string, string | number>, ignoreData?: Record<string, string | number>) => {
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

export const toStringIfNeed = (value: unknown): string => {
  if (typeof value === "object" && !(value instanceof File)) {
    return JSON.stringify(value);
  } else if (typeof value === "boolean" || typeof value === "number") {
    return value.toString();
  }

  return value as string;
};

export const fromObjetToFomData = (data: Record<string, unknown>) => {
  const formData = new FormData();

  for (const key in data) {
    if (Array.isArray(data[key])) {
      for (const item of data[key]) {
        formData.append(key, toStringIfNeed(item));
      }

      continue;
    } else if (typeof data[key] === "object") {
      for (const itemKey in data[key]) {
        if ((data[key] as Record<string, unknown>)[itemKey])
          formData.append(`${key}.${itemKey}`, toStringIfNeed((data[key] as Record<string, unknown>)[itemKey]));
      }

      continue;
    } else if (data[key] instanceof File) {
      formData.append(key, data[key]);
      continue;
    }

    formData.append(key, toStringIfNeed(data[key]));
  }

  return formData;
};

import { FieldNamesType } from "antd/es/cascader";

export const getBase64 = (file: FieldNamesType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader: any = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error: Error) => reject(error);
  });

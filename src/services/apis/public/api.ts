import AXIOS_INSTANCE from "@/services/instance";
import { BaseResponse, SearchResponse } from "@/types/response";
import { SearchRequest } from "./dto";

export const search = async ({ term }: SearchRequest): Promise<BaseResponse<SearchResponse>> => {
  const response = await AXIOS_INSTANCE.get<BaseResponse<SearchResponse>>(`/search?term=${term}`);

  return response.data;
};

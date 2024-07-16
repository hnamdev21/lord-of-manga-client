import { Role } from "@/types/data";
import { FormCreateRole, FormUpdateRole } from "@/types/form";

export type GetAllRolesRequest = {
  params?: {
    pageNumber?: number;
    size?: number;
  };
};

export type CreateRoleRequest = {
  token: string;
  formData: FormCreateRole;
};

export type UpdateRoleRequest = {
  token: string;
  id: Role["id"];
  formData: FormUpdateRole;
};

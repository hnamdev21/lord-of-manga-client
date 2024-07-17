import { FormSignIn, FormSignOut } from "@/types/form";

export type SignInRequest = {
  formData: FormSignIn;
};

export type SignOutRequest = {
  formData: FormSignOut;
};

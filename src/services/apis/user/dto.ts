import { FormChangePassword, FormForgotPassword, FormSignUp, FormUpdateProfile, FormUpdateUserSetting, FormVerifyEmail } from "@/types/form";

export type SignUpRequest = {
  formData: FormSignUp;
};

export type VerifyEmailRequest = {
  formData: FormVerifyEmail;
};

export type UpdateProfileRequest = {
  token: string;
  formData: FormUpdateProfile;
};

export type UpdateUserSettingsRequest = {
  token: string;
  formData: FormUpdateUserSetting;
};

export type ChangePasswordRequest = {
  formData: FormChangePassword;
};

export type ForgotPasswordRequest = {
  formData: FormForgotPassword;
};

export type GetMyProfileRequest = {
  token: string;
};

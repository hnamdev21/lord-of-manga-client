"use client";

import { message } from "antd";
import jwt from "jsonwebtoken";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

import { DefaultRoleValue } from "@/constants/default-data";
import LocalStorageKey from "@/constants/local-key";
import Notification from "@/constants/notification";
import Path, { adminPaths, authorizedUserPaths } from "@/constants/path";
import { AuthAPI } from "@/services/apis/auth";
import { UserAPI } from "@/services/apis/user";
import { User } from "@/types/data";

type Auth = {
  token: string;
};

export const AuthContext = React.createContext<{
  auth: Auth;
  user: User | null;
  refreshUser: () => Promise<void>;
  signIn: (token: string) => void;
  signOut: () => void;
}>({
  auth: {
    token: "",
  },
  user: null,
  refreshUser: async () => {},
  signIn: () => {},
  signOut: () => {},
});

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const router = useRouter();

  const [auth, setAuth] = React.useState<Auth>({
    token: "",
  });
  const [user, setUser] = React.useState<User | null>(null);

  const refreshUser = async () => {
    if (!auth.token) return;

    const response = await UserAPI.getMyProfile({ token: auth.token });
    setUser(response.data);
  };

  const signIn = async (token: string) => {
    const response = await UserAPI.getMyProfile({ token: auth.token });

    localStorage.setItem(LocalStorageKey.TOKEN, token);

    setUser(response.data);
    setAuth({
      token,
    });

    window.location.href = Path.USER.HOME;
  };

  const signOut = async () => {
    const token = localStorage.getItem(LocalStorageKey.TOKEN) || "";

    await AuthAPI.signOut({ formData: { token } });

    localStorage.removeItem(LocalStorageKey.TOKEN);

    setAuth({
      token: "",
    });
    setUser(null);

    router.push(Path.AUTH.SIGN_IN);
  };

  const validateUser = async () => {
    jwt.verify(auth.token, process.env.NEXT_PUBLIC_JWT_SECRET || "");

    const response = await UserAPI.getMyProfile({ token: auth.token });
    const user = response.data;
    setUser(user);

    if (user.roles.length === 0) {
      message.info(Notification.banned);
      signOut();
      return;
    }

    adminPaths.forEach((path) => {
      if (pathname.startsWith(path) && !user.roles.some((role) => role.value === DefaultRoleValue.ADMIN)) {
        message.info(Notification.signInAsAdminRequired);
        window.location.href = Path.ERROR.FORBIDDEN;
      }
    });
  };

  React.useEffect(() => {
    const token = localStorage.getItem(LocalStorageKey.TOKEN);

    console.log("🚀 -> file: AuthProvider.tsx:83 -> React.useEffect -> token ::", token);

    if (token) {
      setAuth({
        token,
      });

      if (pathname === Path.AUTH.SIGN_IN || pathname === Path.AUTH.SIGN_UP) {
        router.push(Path.USER.HOME);
      }

      return;
    }

    for (const path of authorizedUserPaths) {
      if (pathname.startsWith(path)) {
        message.info(Notification.signInRequired);
        router.push(Path.AUTH.SIGN_IN);
        return;
      }
    }

    for (const path of adminPaths) {
      if (pathname.startsWith(path)) {
        message.info(Notification.signInRequired);
        router.push(Path.AUTH.SIGN_IN);
        return;
      }
    }
  }, [pathname]);

  React.useEffect(() => {
    if (!auth.token) return;

    try {
      validateUser();
    } catch (error) {
      signOut();
    }
  }, [auth.token]);

  return <AuthContext.Provider value={{ auth, user, refreshUser, signIn, signOut }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

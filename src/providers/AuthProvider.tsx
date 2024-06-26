"use client";

import { message } from "antd";
import jwt from "jsonwebtoken";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

import AXIOS_INSTANCE from "@/apis/instance";
import Path, { adminPaths, authorizedUserPaths } from "@/constants/path";
import { User } from "@/types/data";
import { BaseResponse } from "@/types/response";

type Auth = {
  token: string | null;
};

export const AuthContext = React.createContext<{
  auth: Auth;
  user: User | null;
  refreshUser: () => Promise<void>;
  signIn: (token: string) => void;
  signOut: () => void;
} | null>(null);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();

  const [auth, setAuth] = React.useState<Auth>({
    token: null,
  });
  const [user, setUser] = React.useState<User | null>(null);

  const getMe = async (token: string) => {
    const { data } = (
      await AXIOS_INSTANCE.get<BaseResponse<User>>("/users/mine", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    ).data;

    return data;
  };

  const refreshUser = async () => {
    if (!auth.token) return;

    const user = await getMe(auth.token);
    setUser(user);
  };

  const signIn = async (token: string) => {
    const user = await getMe(token);

    localStorage.setItem("token", token);

    setUser(user);
    setAuth({
      token,
    });

    router.push(Path.USER.HOME);
  };

  const signOut = () => {
    localStorage.removeItem("token");

    setAuth({
      token: null,
    });
    setUser(null);

    router.push(Path.AUTH.SIGN_IN);
  };

  React.useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setAuth({
        token,
      });

      return;
    }

    authorizedUserPaths.forEach((path) => {
      if (pathname.startsWith(path)) {
        message.info("Please sign in to continue");
        router.push(Path.AUTH.SIGN_IN);
      }
    });
  }, []);

  React.useEffect(() => {
    if (!auth.token) return;

    try {
      jwt.verify(auth.token, process.env.NEXT_PUBLIC_JWT_SECRET || "");

      getMe(auth.token).then((user) => {
        setUser(user);

        adminPaths.forEach((path) => {
          if (pathname.startsWith(path) && !user.roles.some((role) => role.name === "ADMIN")) {
            router.push(Path.ERROR.FORBIDDEN);
          }
        });
      });
    } catch (error) {
      signOut();
    }
  }, [auth.token]);

  return <AuthContext.Provider value={{ auth, user, refreshUser, signIn, signOut }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

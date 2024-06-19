"use client";

import { message } from "antd";
import jwt from "jsonwebtoken";
import { useRouter } from "next/navigation";
import React from "react";

import AXIOS_INSTANCE from "@/apis/instance";
import Path from "@/constants/path";
import { User } from "@/types/data";
import { BaseResponse } from "@/types/response";

type Auth = {
  token: string | null;
  username: string | null;
};

export const AuthContext = React.createContext<{
  auth: Auth;
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  signIn: (token: string) => void;
  signOut: () => void;
  isLoaded: boolean;
} | null>(null);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [auth, setAuth] = React.useState<Auth>({
    token: null,
    username: null,
  });
  const [user, setUser] = React.useState<User | null>(null);
  const [isLoaded, setIsLoaded] = React.useState<boolean>(false);

  const signIn = (token: string) => {
    localStorage.setItem("token", token);
    setAuth({
      token,
      username: jwt.decode(token)?.sub as string,
    });
    router.push(Path.USER.HOME);
  };

  const signOut = () => {
    localStorage.removeItem("token");
    setAuth({
      token: null,
      username: null,
    });
    router.push(Path.AUTH.SIGN_IN);
  };

  React.useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET || "", async (err, decoded) => {
        if (err) {
          message.info("Your session has expired. Please sign in again.");
          signOut();
          setIsLoaded(true);
          return;
        }

        const { data } = (
          await AXIOS_INSTANCE.get<BaseResponse<User>>("/users/mine", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
        ).data;

        setIsLoaded(true);
        setUser(data);
        setAuth({
          token,
          username: (decoded as jwt.JwtPayload).sub as string,
        });
      });
    }
  }, []);

  return <AuthContext.Provider value={{ auth, user, setUser, signIn, signOut, isLoaded }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

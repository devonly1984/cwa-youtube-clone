import { inferRouterOutputs } from "@trpc/server";
import { AppRouter } from "@/trpc/routers/_app";
import { ReactNode } from "react";

export type VideoGetOneOutput =
  inferRouterOutputs<AppRouter>["videos"]["getOne"];

export interface LayoutProps {
  children: ReactNode;
}

export type CommentsGetManyOutput =
  inferRouterOutputs<AppRouter>["comments"]["getMany"];
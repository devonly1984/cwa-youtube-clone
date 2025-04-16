import { inferRouterOutputs } from "@trpc/server";
import { AppRouter } from "@/trpc/routers/_app";
import { ReactNode } from "react";
import { videoRowCardVariants } from "@/constants";
import { VariantProps } from "class-variance-authority";

export type VideoGetOneOutput =
  inferRouterOutputs<AppRouter>["videos"]["getOne"];

export interface LayoutProps {
  children: ReactNode;
}

export type CommentsGetManyOutput =
  inferRouterOutputs<AppRouter>["comments"]["getMany"];

  //Change to videos GetMany
export type SuggestionsGetManyOutput =
  inferRouterOutputs<AppRouter>["suggestions"]["getMany"];


  export interface VideoRowCardProps
    extends VariantProps<typeof videoRowCardVariants> {
    data?: SuggestionsGetManyOutput["items"][number];
    onRemove?: () => void;
  }


  export type StudioGetManyOutput = inferRouterOutputs<AppRouter>['studio']['getMany']
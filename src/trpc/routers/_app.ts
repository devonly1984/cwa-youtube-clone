import { categoryRouter } from "../categories/server/procedures";
import { commentsRouter } from "../comments/server/procedures";
import { createTRPCRouter } from "../init";
import { studioRouter } from "../studio/server/procedures";
import { subscriptionRouter } from "../subscriptions/server/procedures";
import { videoReactionsRouter } from "../videoReactions/server/procedures";
import { videosRouter } from "../videos/server/procedures";
import {videoViewsRouter} from '@/trpc/video-views/server/procedures'
export const appRouter = createTRPCRouter({
  categories: categoryRouter,
  studio: studioRouter,
  videos: videosRouter,
  videoViews: videoViewsRouter,
  videoReactions: videoReactionsRouter,
  subscriptions: subscriptionRouter,
  comments: commentsRouter
});
// export type definition of API
export type AppRouter = typeof appRouter;

import { categoryRouter } from "../categories/server/procedures";
import { createTRPCRouter } from "../init";
import { studioRouter } from "../studio/server/procedures";
import { videosRouter } from "../videos/server/procedures";
import {videoViewsRouter} from '@/trpc/video-views/server/procedures'
export const appRouter = createTRPCRouter({
  categories: categoryRouter,
  studio: studioRouter,
  videos: videosRouter,
  videoViews: videoViewsRouter
});
// export type definition of API
export type AppRouter = typeof appRouter;

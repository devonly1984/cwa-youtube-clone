import { categoryRouter } from "../categories/server/procedures";
import { createTRPCRouter } from "../init";
import { studioRouter } from "../studio/server/procedures";
import { videosRouter } from "../videos/server/procedures";
export const appRouter = createTRPCRouter({
  categories: categoryRouter,
  studio: studioRouter,
  videos: videosRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;

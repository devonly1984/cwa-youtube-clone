import { categoryRouter } from "../categories/server/procedures";
import { createTRPCRouter } from "../init";
export const appRouter = createTRPCRouter({
  categories: categoryRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;

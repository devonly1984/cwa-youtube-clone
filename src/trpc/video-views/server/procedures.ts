import {createTRPCRouter,protectedProcedure} from '@/trpc/init'
import {z} from 'zod';
import {db} from '@/db'
import {videoViews} from '@/db/schema'
import {and,eq} from 'drizzle-orm'
export const videoViewsRouter = createTRPCRouter({
    create: protectedProcedure.input(z.object({videoId:z.string().uuid()})).mutation(async({ctx,input})=>{
        const {id:userId} = ctx.user;
        const {videoId} = input;
        const [existingRecord] = await db.select()
        .from(videoViews)
        .where(and(
            eq(videoViews.videoId,videoId),
            eq(videoViews.userId,userId)
        ))
        
        if (existingRecord) {
            return existingRecord
        }
        const [createdVideoView] = await db.insert(videoViews).values({
            userId,videoId
        }).returning()
        
        return createdVideoView

    })

})
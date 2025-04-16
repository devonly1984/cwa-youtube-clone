import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { db } from "@/db";
import { commentReactions,   } from "@/db/schema";
import { z } from "zod";
import { and, eq } from "drizzle-orm";

export const commentRectionsRouter = createTRPCRouter({
    like: protectedProcedure.input(z.object({commentId:z.string().uuid()})).mutation(async({ctx,input})=>{
            const {id:userId} = ctx.user;
            const {commentId} = input;
            const [existingRecord] = await db.select()
            .from(commentReactions)
            .where(and(
                eq(commentReactions.commentId,commentId),
                eq(commentReactions.userId,userId),
                eq(commentReactions.type,'like')
            ))
            
            if (existingRecord) {
               const [deleteViewerReaction] = await db
                 .delete(commentReactions)
                 .where(
                   and(
                     eq(commentReactions.userId, userId),
                     eq(commentReactions.commentId, commentId)
                   )
                 ).returning()
                 return deleteViewerReaction;
            }
            const [createdVideoReaction] = await db
              .insert(commentReactions)
              .values({
                userId,
                commentId,
                type: "like",
              })
              .onConflictDoUpdate({
                target: [commentReactions.userId, commentReactions.commentId],
                set: {
                  type: "like",
                },
              })
              .returning();
            
            return createdVideoReaction
    
        }),
        dislike: protectedProcedure.input(z.object({commentId:z.string().uuid()})).mutation(async({ctx,input})=>{
            const {id:userId} = ctx.user;
            const {commentId} = input;

            
            const [existingRecord] = await db.select()
            .from(commentReactions)
            .where(and(
                eq(commentReactions.commentId,commentId),
                eq(commentReactions.userId,userId),
                eq(commentReactions.type,'dislike')
            ))
            
            if (existingRecord) {
               const [deleteViewerReaction] = await db
                 .delete(commentReactions)
                 .where(
                   and(
                     eq(commentReactions.userId, userId),
                     eq(commentReactions.commentId, commentId)
                   )
                 )
                 .returning();
                 return deleteViewerReaction;
            }
            const [createdVideoReaction] = await db
              .insert(commentReactions)
              .values({
                userId,
                commentId,
                type: "dislike",
              })
              .onConflictDoUpdate({
                target: [commentReactions.userId, commentReactions.commentId],
                set: {
                  type: "dislike",
                },
              })
              .returning();
            
            return createdVideoReaction
    
        })
})
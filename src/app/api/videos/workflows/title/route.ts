import { db } from "@/db";
import { videos } from "@/db/schema";
import { serve } from "@upstash/workflow/nextjs"
import { and, eq } from "drizzle-orm";
interface InputType {
  userId:string;
  videoId:string;
}
 export const  POST  = serve(
  async (context) => {
    const input = context.requestPayload as InputType;
    const {userId,videoId}= input;
    const existingVideo = context.run('get-video',async()=>{
      const data = await db
        .select()
        .from(videos)
        .where(and(eq(videos.id, videoId), eq(videos.userId, userId)));
        if (!data[0]) {
          throw new Error("Not Found");
        }
        return data[0]
    })
    console.log(existingVideo);
    
  

  
  }
)

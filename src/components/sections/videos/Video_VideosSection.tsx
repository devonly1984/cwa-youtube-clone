"use client";
import VideoPlayer from "@/components/shared/VideoPlayer";
import { cn } from "@/lib/utils";
import { trpc } from "@/trpc/client";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import {VideoBanner,VideoTopRow} from '@/components/subsections/videos'
import { toast } from "sonner";
import { useAuth } from "@clerk/nextjs";
import VideoSectionSkeleton from "@/components/skeletons/VideoSectionSkeleton";

interface VideosSectionProps {
  videoId: string;
}
const VideosSection = ({ videoId }: VideosSectionProps) => {
  return (
    <Suspense fallback={<VideoSectionSkeleton />}>
      <ErrorBoundary fallback={<></>}>
        <VideoSectionSuspense videoId={videoId} />
      </ErrorBoundary>
    </Suspense>
  );
};
const VideoSectionSuspense = ({ videoId }: VideosSectionProps) => {
  const {isSignedIn} = useAuth()
  const utils = trpc.useUtils()
  const [video] = trpc.videos.getOne.useSuspenseQuery({ id: videoId });
  const createView = trpc.videoViews.create.useMutation({
    onSuccess: ()=>{
      utils.videos.getOne.invalidate({id:videoId})
    },
    onError:(error)=>{
      toast.error("Something went wrong",{description: error.message})
    }
  })
  const handlePlay = ()=>{
    if (!isSignedIn) return;
    createView.mutate({ videoId})
  }
  return (
    <>
      <div
        className={cn(
          "aspect-video bg-black rounded-xl relative overflow-hidden",
          video.muxStatus !== "ready" && "rounded-b-none"
        )}
      >
        <VideoPlayer
          autoPlay
          onPlay={handlePlay}
          playbackId={video.muxPlaybackId}
          thumbnailUrl={video.thumbnailUrl}
        />
        {JSON.stringify(video)}
      </div>
      <VideoBanner status={video.muxStatus} />
      <VideoTopRow video={video} />
    </>
  );
};
export default VideosSection;

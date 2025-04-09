"use client";
import VideoPlayer from "@/components/shared/VideoPlayer";
import { cn } from "@/lib/utils";
import { trpc } from "@/trpc/client";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import VideoBanner from "@/components/sections/videos/VideoBanner";
import Video_VideoTopRow from "./VideoTopRow";

interface VideosSectionProps {
  videoId: string;
}
const VideosSection = ({ videoId }: VideosSectionProps) => {
  return (
    <Suspense fallback={<>Loading...</>}>
      <ErrorBoundary fallback={<></>}>
        <VideoSectionSuspense videoId={videoId} />
      </ErrorBoundary>
    </Suspense>
  );
};
const VideoSectionSuspense = ({ videoId }: VideosSectionProps) => {
  const [video] = trpc.videos.getOne.useSuspenseQuery({ id: videoId });
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
          onPlay={() => {}}
          playbackId={video.muxPlaybackId}
          thumbnailUrl={video.thumbnailUrl}
        />
        {JSON.stringify(video)}
      </div>
      <VideoBanner status={video.muxStatus} />
      <Video_VideoTopRow video={video} />
    </>
  );
};
export default VideosSection;

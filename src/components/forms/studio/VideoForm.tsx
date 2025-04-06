"use client";

import VideoFormSkeleton from "@/components/skeletons/VideoFormSkeleton";
import { trpc } from "@/trpc/client";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

interface VideoFormProps {
  videoId:string;
}

const VideoForm = ({ videoId }: VideoFormProps) => {
  return (
    <Suspense fallback={<VideoFormSkeleton />}>
      <ErrorBoundary fallback={<></>}>
        <VideoFormSuspense videoId={videoId} />
      </ErrorBoundary>
    </Suspense>
  );
};
const VideoFormSuspense = ({ videoId }: VideoFormProps) => {
  const [video] = trpc.studio.getOne.useSuspenseQuery({ id: videoId });
  return <div>{JSON.stringify(video)}</div>;
};
export default VideoForm;

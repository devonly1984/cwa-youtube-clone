"use client"

import InfiniteScroll from "@/components/shared/InfiniteScroll";
import VideoSectionsSkeleton from "@/components/skeletons/VideoSectionsSkeleton";
import VideosTable from "@/components/tables/studio/VideosTable";
import { DEFAULT_LIMIT } from "@/constants";
import { trpc } from "@/trpc/client";
import { Suspense } from "react"
import { ErrorBoundary } from "react-error-boundary"

const VideosSection = ()=>{
    return (
      <Suspense fallback={<VideoSectionsSkeleton />}>
        <ErrorBoundary fallback={<p>Error...</p>}>
          <VideosSectionSuspense />
        </ErrorBoundary>
      </Suspense>
    );
}
const VideosSectionSuspense = () => {
    const [videos,query] = trpc.studio.getMany.useSuspenseInfiniteQuery(
      {
        limit: DEFAULT_LIMIT,
      },
      {
        getNextPageParam: (lastPage) => lastPage.nextCursor,
      }
    );
    if (!videos) {
      return null;
    }
  return (
    <div>
      <VideosTable videos={videos} />
      <InfiniteScroll
        isManual
        hasNextPage={query.hasNextPage}
        isFetchingNextPage={query.isFetchingNextPage}
        fetchNextPage={query.fetchNextPage}
      />
    </div>
  );
}
export default VideosSection
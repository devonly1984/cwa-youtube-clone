"use client"

import { TrendingVideosSectionSkeleton } from "@/components/shared/skeletons";
import { DEFAULT_LIMIT } from "@/constants";
import { trpc } from "@/trpc/client";
import { Suspense } from "react"
import { ErrorBoundary } from "react-error-boundary"
import InfiniteScroll from "@/components/shared/InfiniteScroll";
import VideoGridCard from "../../suggestions/VideoGridCard";

const TrendingVideosSection = ()=>{
    return (
      <Suspense fallback={<TrendingVideosSectionSkeleton />}>
        <ErrorBoundary fallback={<>Error...</>}>
          <TrendingVideosSectionSuspense />
        </ErrorBoundary>
      </Suspense>
    );
}
const TrendingVideosSectionSuspense = () => {
  const [videos, query] = trpc.videos.getTrending.useSuspenseInfiniteQuery(
    {
      limit: DEFAULT_LIMIT,
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    }
  );
  return (
    <div>
      <div className="gap-4 gap-y-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 [@media(min-width:1920px)]:grid-cols-5 [@media(min-width:2200px)]:grid-cols-6">
        {videos.pages
          .flatMap((page) => page.items)
          .map((video) => (
            <VideoGridCard key={video.id} data={video} />
          ))}
      </div>
      <InfiniteScroll
        hasNextPage={query.hasNextPage}
        isFetchingNextPage={query.isFetchingNextPage}
        fetchNextPage={query.fetchNextPage}
      />
    </div>
  );
};
export default TrendingVideosSection;
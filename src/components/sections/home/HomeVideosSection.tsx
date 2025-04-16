"use client"

import { HomeVideosSectionSkeletion } from "@/components/shared/skeletons";
import { DEFAULT_LIMIT } from "@/constants";
import { trpc } from "@/trpc/client";
import { Suspense } from "react"
import { ErrorBoundary } from "react-error-boundary"
import VideoGridCard from "../suggestions/VideoGridCard";
import InfiniteScroll from "@/components/shared/InfiniteScroll";
interface HomeVideosSectionProps {
  categoryId: string | undefined;
}
const HomeVideosSection = ({categoryId}:HomeVideosSectionProps)=>{
    return (
      <Suspense key={categoryId} fallback={<HomeVideosSectionSkeletion />}>
        <ErrorBoundary fallback={<>Error...</>}>
          <HomeVideosSectionSuspense categoryId={categoryId} />
        </ErrorBoundary>
      </Suspense>
    );
}
const HomeVideosSectionSuspense = ({ categoryId }: HomeVideosSectionProps) => {
const [videos, query] = trpc.videos.getMany.useSuspenseInfiniteQuery(
  {
    categoryId,
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
export default HomeVideosSection
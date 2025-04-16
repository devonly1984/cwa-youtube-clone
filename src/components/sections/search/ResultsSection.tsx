"use client"

import { DEFAULT_LIMIT } from "@/constants";
import { useIsMobile } from "@/hooks/use-mobile";
import { trpc } from "@/trpc/client";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import VideoGridCard from "../suggestions/VideoGridCard";
import VideoRowCard from "../suggestions/VideoRowCard";
import InfiniteScroll from "@/components/shared/InfiniteScroll";
import { ResultsSectionSkeleton } from "@/components/shared/skeletons";

interface ResultsSectionProps {
    query:string |undefined;
    categoryId:string|undefined;
}
const ResultsSection = (props: ResultsSectionProps) => {
  return (
    <Suspense
      key={`${props.query}-${props.categoryId}`}
      fallback={<ResultsSectionSkeleton />}
    >
      <ErrorBoundary fallback={<>Error...</>}>
        <ResultsSectionSuspense {...props} />
      </ErrorBoundary>
    </Suspense>
  );
};
const ResultsSectionSuspense = ({ query, categoryId }: ResultsSectionProps) => {
    const isMobile =useIsMobile();
    const [results, resultQuery] = trpc.search.getMany.useSuspenseInfiniteQuery(
        
      {
        query,
        categoryId,
        limit: DEFAULT_LIMIT,
      },
      {
        getNextPageParam: (lastPage) => lastPage.nextCursor,
      }
    );
  return (
    <>
      {isMobile ? (
        <div className="flex flex-col gap-4 gap-y-10">
          {results.pages
            .flatMap((page) => page.items)
            .map((video) => (
              <VideoGridCard key={video.id} data={video} />
            ))}
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {results.pages
            .flatMap((page) => page.items)
            .map((video) => (
              <VideoRowCard key={video.id} data={video} />
            ))}
        </div>
      )}
      <InfiniteScroll
        hasNextPage={resultQuery.hasNextPage}
        isFetchingNextPage={resultQuery.isFetchingNextPage}
        fetchNextPage={resultQuery.fetchNextPage}
      />
    </>
  );
};
export default ResultsSection
"use client";

import CommentForm from "@/components/forms/comments/CommentForm";
import CommentItem from "@/components/forms/comments/CommentItem";
import InfiniteScroll from "@/components/shared/InfiniteScroll";
import CommentsSkeleton from "@/components/skeletons/CommentsSkeleton";
import { DEFAULT_LIMIT } from "@/constants";
import { trpc } from "@/trpc/client";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
interface CommentSectionProps {
  videoId:string;
}
const CommentSection = ({videoId}:CommentSectionProps) => {
  return (
    <Suspense fallback={<CommentsSkeleton />}>
      <ErrorBoundary fallback={<>Error...</>}>
        <CommentSectionSuspense videoId={videoId} />
      </ErrorBoundary>
    </Suspense>
  );
};
const CommentSectionSuspense = ({ videoId }: CommentSectionProps) => {
  const [comments,query] = trpc.comments.getMany.useSuspenseInfiniteQuery(
    {
      videoId,
      limit: DEFAULT_LIMIT,
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    }
  );
  return (
    <div className="mt-6">
      <div className="flex flex-co gap-6">
        <h1 className="text-xl font-bold">
          {comments.pages[0].totalCount} Comments
        </h1>
        <CommentForm videoId={videoId} />
      </div>
      <div className="flex flex-col gap-4 mt-2">
        {comments.pages
          .flatMap((page) => page.items)
          .map((comment) => (
            <CommentItem key={comment.id} comment={comment} />
          ))}
        <InfiniteScroll
          isManual
          hasNextPage={query.hasNextPage}
          fetchNextPage={query.fetchNextPage}
          isFetchingNextPage={query.isFetchingNextPage}
        />
      </div>
    </div>
  );
};
export default CommentSection;

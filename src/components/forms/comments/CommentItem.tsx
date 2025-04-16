"use client";
import CommentsDropdown from "@/components/menus/comments/CommentsDropdown";
import UserAvatar from "@/components/shared/UserAvatar";
import { Button } from "@/components/ui/button";
import { USER_FALLBACK } from "@/constants";
import { cn } from "@/lib/utils";
import { trpc } from "@/trpc/client";

import { CommentsGetManyOutput } from "@/types";
import { useClerk } from "@clerk/nextjs";
import { formatDistanceToNow } from "date-fns";
import { ChevronDownIcon, ChevronUpIcon, ThumbsDownIcon, ThumbsUpIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { toast } from "sonner";
import { CommentReplies, CommentForm } from "./";

interface CommentItemProps {
  comment: CommentsGetManyOutput["items"][number];
  variant?:"reply"|"comment"
}
const CommentItem = ({ comment, variant = "comment" }: CommentItemProps) => {
  const clerk = useClerk();
  const utils = trpc.useUtils();
  const [isReplyOpen, setIsReplyOpen] = useState(false);
  const [isRepliesOpen, setIsRepliesOpen] = useState(false); 
  const like = trpc.commentReactions.like.useMutation({
    onSuccess: () => {
      utils.comments.getMany.invalidate({ videoId: comment.videoId });
    },
    onError: (error) => {
      if (error?.data?.code === "UNAUTHORIZED") {
        clerk.openSignIn();
        toast.error("Something went wrong");
      }
    },
  });
  const dislike = trpc.commentReactions.dislike.useMutation({
    onSuccess: () => {
      utils.comments.getMany.invalidate({ videoId: comment.videoId });
    },
    onError: (error) => {
      if (error?.data?.code === "UNAUTHORIZED") {
        clerk.openSignIn();
        toast.error("Something went wrong");
      }
    },
  });
  return (
    <div className="">
      <div className="flex gap-4">
        <Link href={`/users/${comment.userId}`}>
          <UserAvatar
            size={variant === "comment" ? "lg" : "sm"}
            imageUrl={comment.user.imageUrl ?? USER_FALLBACK}
            name={comment.user.name}
          />
        </Link>
        <div className="flex min-w-0">
          <Link href={`/users/${comment.userId}`}>
            <div className="flex items-center gap-2 mb-0.5">
              <span className="font-medium text-sm pb-0.5">
                {comment.user.name}
              </span>
              <span className="text-xs text-muted-foreground">
                {formatDistanceToNow(comment.createdAt, { addSuffix: true })}
              </span>
            </div>
          </Link>
          <p className="text-sm">{comment.value}</p>
          <div className="flex items-center gap-2 mt-1">
            <div className="flex items-center">
              <Button
                className="size-8"
                size={"icon"}
                variant={"ghost"}
                onClick={() => like.mutate({ commentId: comment.id })}
                disabled={like.isPending}
              >
                <ThumbsUpIcon
                  className={cn(
                    comment.viewerReaction === "like" && "fill-black"
                  )}
                />
              </Button>
              <span className="text-xs text-muted-foreground">
                {comment.likeCount}
              </span>
              <Button
                className="size-8"
                size={"icon"}
                variant={"ghost"}
                onClick={() => dislike.mutate({ commentId: comment.id })}
                disabled={dislike.isPending}
              >
                <ThumbsDownIcon
                  className={cn(
                    comment.viewerReaction === "dislike" && "fill-black"
                  )}
                />
              </Button>
              <span className="text-xs text-muted-foreground">
                {comment.dislikeCount}
              </span>
            </div>
            {variant === "comment" && (
              <Button
                variant={"ghost"}
                size={"sm"}
                className="h-8"
                onClick={() => {}}
              >
                Reply
              </Button>
            )}
          </div>
        </div>
        <CommentsDropdown
          comment={comment}
          setIsReplyOpen={setIsReplyOpen}
          variant={variant}
        />
      </div>
      {isReplyOpen && variant === "comment" && (
        <div className="mt-4 pl-14">
          <CommentForm
            videoId={comment.videoId}
            onSuccess={() => {
              setIsReplyOpen(false);
              setIsRepliesOpen(true);
            }}
            variant="reply"
            parentId={comment.id}
            onCancel={() => setIsReplyOpen(false)}
          />
        </div>
      )}
      {comment.replyCount > 0 && variant === "comment" && (
        <div className="pl-14">
          <Button
            size="sm"
            onClick={() => setIsRepliesOpen((current) => !current)}
            variant={"tertiary"}
          >
            {isRepliesOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
            {comment.replyCount} replies
          </Button>
        </div>
      )}
      {comment.replyCount > 0 && variant === "comment" && isRepliesOpen && (
        <CommentReplies parentId={comment.id} videoId={comment.videoId} />
      )}
    </div>
  );
};
export default CommentItem;

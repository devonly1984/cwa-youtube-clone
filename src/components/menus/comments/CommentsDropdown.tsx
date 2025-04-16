"use client"
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { trpc } from "@/trpc/client";
import { CommentsGetManyOutput } from "@/types";
import { useAuth, useClerk } from "@clerk/nextjs";
import { MessageSquareIcon, MoreVerticalIcon, Trash2Icon } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

import { toast } from "sonner";
interface CommentsDropdownProps {
  comment: CommentsGetManyOutput["items"][number];
  setIsReplyOpen: Dispatch<SetStateAction<boolean>>;
  variant?: "reply" | "comment";
}
const CommentsDropdown = ({
  comment,
  setIsReplyOpen,
  variant,
}: CommentsDropdownProps) => {
  const { userId } = useAuth();
  const clerk = useClerk();
  const utils = trpc.useUtils();

  const remove = trpc.comments.remove.useMutation({
    onSuccess: () => {
      toast.success("Comment Deleted");
      utils.comments.getMany.invalidate({ videoId: comment.videoId });
    },
    onError: (error) => {
      toast.error("Something went wrong");
      if (error.data?.code === "UNAUTHORIZED") {
        clerk.openSignIn();
      }
    },
  });

  return (
    <>
      {comment.user.clerkId !== userId && variant === "comment" && (
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button variant={"ghost"} size="icon" className="size-8">
              <MoreVerticalIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setIsReplyOpen(true)}>
              <MessageSquareIcon className="size-4" />
              Reply
            </DropdownMenuItem>
            {comment.user.clerkId === userId && (
              <DropdownMenuItem
                onClick={() => remove.mutate({ id: comment.id })}
              >
                <Trash2Icon className="size-4" />
                Delete
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </>
  );
};
export default CommentsDropdown
import CommentsDropdown from "@/components/menus/comments/CommentsDropdown";
import UserAvatar from "@/components/shared/UserAvatar";
import { USER_FALLBACK } from "@/constants";

import { CommentsGetManyOutput } from "@/types";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";

interface CommentItemProps {
  comment: CommentsGetManyOutput["items"][number];
}
const CommentItem = ({ comment }: CommentItemProps) => {

  return (
    <div className="">
      <div className="flex gap-4">
        <Link href={`/users/${comment.userId}`}>
          <UserAvatar
            size="lg"
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
        </div>
        <CommentsDropdown comment={comment} />
      </div>
    </div>
  );
};
export default CommentItem
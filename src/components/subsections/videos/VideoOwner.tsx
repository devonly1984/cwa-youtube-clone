"use client";
import SubscriptionButton from "@/components/inputs/SubscriptionButton";
import UserAvatar from "@/components/shared/UserAvatar";
import UserInfo from "@/components/shared/UserInfo";
import { Button } from "@/components/ui/button";
import { useSubscription } from "@/hooks/useSubscription";
import { VideoGetOneOutput } from "@/types";
import { useAuth } from "@clerk/nextjs";
import Link from "next/link";

interface VideoOwnerProps {
  user: VideoGetOneOutput["user"];
  videoId: string;
}
const VideoOwner = ({ user, videoId }: VideoOwnerProps) => {
  const { userId: clerkUserId,isLoaded } = useAuth();
  const {isPending,onClick} = useSubscription({
    userId: user.id,
    isSubscribed: user.viewerSubscribed,
    fromVideoId: videoId,
  });
  return (
    <div className="flex items-center sm:items-start justify-between sm:justify-start gap-3 min-w-0">
      <Link href={`/users/${user.id}`}>
        <div className="flex items-center gap-3 min-w-0">
          <UserAvatar size="lg" imageUrl={user.imageUrl} name={user.name} />
          <div className="flex flex-col gap-1 min-w-0">
            <UserInfo size="lg" name={user.name} />
            <span className="text-sm text-muted-foreground line-clamp-1">
              {/**TODO: Get Subscribers */}
              {user.subscriberCount} Subscribers
            </span>
          </div>
        </div>
      </Link>
      {clerkUserId === user.clerkId ? (
        <Button className="rounded-full" asChild variant={"secondary"}>
          <Link href={`/studio/videos/${videoId}`}>Edit Video</Link>
        </Button>
      ) : (
        <SubscriptionButton
          onClick={onClick}
          disabled={isPending || !isLoaded}
          isSubscribed={user.viewerSubscribed}
          className="flex-none"
        />
      )}
    </div>
  );
};
export default VideoOwner;

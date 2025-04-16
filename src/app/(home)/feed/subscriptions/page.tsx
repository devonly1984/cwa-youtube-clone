import SubscriptionView from "@/components/views/feed/subscriptions/SubscriptionView";
import { DEFAULT_LIMIT } from "@/constants";
import { HydrateClient, trpc } from "@/trpc/server";

export const dynamic = "force-dynamic";

const SubscriptionsPage = async () => {

  void trpc.videos.getManySubscribed.prefetchInfinite({
    limit: DEFAULT_LIMIT,
  });
  return (
    <HydrateClient>
      <SubscriptionView />
    </HydrateClient>
  );
};
export default SubscriptionsPage;

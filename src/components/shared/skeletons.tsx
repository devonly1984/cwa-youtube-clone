import FilterCarousel from "./FilterCarousel";
import { Loader2Icon } from "lucide-react";
import { SidebarHeader } from "../ui/sidebar";
import { Skeleton } from "../ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { DEFAULT_LIMIT, thumbnailVariants, videoRowCardVariants } from "@/constants";
import { VideoRowCardProps } from "@/types";
import { cn } from "@/lib/utils";
export const CategoriesSkeleton = () => {
  return <FilterCarousel isLoading data={[]} onSelect={() => {}} />;
};

export const CommentsSkeleton = () => {
  return (
    <div className="mt-6 flex justify-center items-center">
      <Loader2Icon className="text-muted-foreground size-7 animate-spin" />
    </div>
  );
};
export const UserSkeleton = () => {
  return (
    <SidebarHeader className="flex items-center justify-center pb-4">
      <Skeleton className="size-[112px] rounded-full" />
      <div className="flex flex-col items-center mt-2 gap-y-2">
        <Skeleton className="h-4 w-[80px]" />
        <Skeleton className="h-4 w-[100px]" />
      </div>
    </SidebarHeader>
  );
};
export const VideoPlayerSkeleton = () => {
  return <div className="aspect-video bg-black rounded-xl" />;
};
export const VideoRowCardSkeleton = ({size}:VideoRowCardProps) => {
  return (
    <div className={videoRowCardVariants({ size })}>
      <Skeleton />
      <div className={thumbnailVariants({ size })}>
        <VideoThumbnailSkeleton />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between gap-x-2">
          <div className="flex-1 min-w-0">
            <Skeleton
              className={cn("h-5 w-[40%]", size === "compact" && "h-4 w-[40%]")}
            />
            {size === "default" && (
              <>
                <Skeleton className="h-4 w-[20%] mt-1" />
                <div className="flex items-center gap-2 my-3">
                  <Skeleton className="size-8 rounded-full" />
                  <Skeleton className="h-4 w-24" />
                </div>
              </>
            )}
            {size === "compact" && (
              <>
                <Skeleton className="h-4 w-[50%] mt-1" />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export const VideoSectionSkeleton = () => {
  return (
    <>
      <VideoPlayerSkeleton />
      <VideoTopRowSkeleton />
    </>
  );
};

export const VideoTopRowSkeleton = () => {
  return (
    <div className="flex flex-col gap-4 mt-4">
      <div className="flex flex-col gap-2">
        <Skeleton className="h-6 w-4/5 md:w-2/5" />
      </div>
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-3 w-[70%]">
          <Skeleton className="size-10 rounded-full shrink-0" />
          <div className="flex flex-col gap-2 w-full">
            <Skeleton className="h-5 w-4/5 md:2/6" />
            <Skeleton className="h-5 w-3/5 md:1/5" />
          </div>
        </div>
        <Skeleton className="h-9 w-2/6 md:1/6 rounded-full" />
      </div>
      <div className="h-[120px] w-full" />
    </div>
  );
};


export const VideoSectionsSkeleton = () => {
  return (
    <>
      <div className="border-y">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="pl-6 w-[510px]">Video</TableHead>
              <TableHead>Visibility</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Views</TableHead>
              <TableHead className="text-right">Comments</TableHead>
              <TableHead className="text-right pr-6">Like</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: DEFAULT_LIMIT }).map((_, index) => (
              <TableRow key={index}>
                <TableCell className="pl-6">
                  <div className="flex items-center gap-4">
                    <Skeleton className="h-20 w-36" />
                    <div className="flex flex-col gap-2">
                      <Skeleton className="h-4 w-[100px]" />
                      <Skeleton className="h-3 w-[150px]" />
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-20" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-16" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-24" />
                </TableCell>
                <TableCell className="text-right">
                  <Skeleton className="h-4 w-12 ml-auto" />
                </TableCell>
                <TableCell className="text-right">
                  <Skeleton className="h-4 w-12 ml-auto" />
                </TableCell>
                <TableCell className="text-right pr-6">
                  <Skeleton className="h-4 w-12 ml-auto" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}

export const VideoThumbnailSkeleton = () => {
    return (
      <div className="relative w-full overflow-hidden  rounded-xl aspect-video">
        <Skeleton className="size-full" />
      </div>
    );
  }

  export const VideoFormSkeleton = () => {
    return <></>
  }
  export const VideoInfoSkeleton = ()=>{
    return (
      <div className="flex gap-3">
        <Skeleton className="size-10 flex-shrink-0 rounded-full" />
        <div className="min-w-0 flex-1 space-y-2">
          <Skeleton className="h-5 w-[90%]" />
          <Skeleton className="h-5 w-[90%]" />
        </div>
      </div>
    );
  }
  export const VideoGridCardSkeleton = ()=>{
    return (
      <div className="flex flex-col gap-2 w-full">
        <VideoThumbnailSkeleton />
        <VideoInfoSkeleton />
      </div>
    );
  }

  export const SuggestionsSectionSkeleton = ()=>{
    return (
      <>
        <div className="hidden md:block space-y 3">
          {Array.from({ length: 8 }).map((_, index) => (
            <VideoRowCardSkeleton key={index} size="compact" />
          ))}
        </div>
        <div className="block md:hidden space-y-10">
          {Array.from({ length: 8 }).map((item, index) => (
            <VideoGridCardSkeleton key={index} />
          ))}
        </div>
      </>
    );
  }

  export const ResultsSectionSkeleton = ()=>{
    return (
      <div className="">
        <div className="hidden flex-col gap-4 md:flex">
          {Array.from({ length: 5 }).map((_, index) => (
            <VideoRowCardSkeleton key={index} />
          ))}
        </div>
        <div className="flex flex-col gap-4 p-4 gap-y-10 pt-6 md:hidden">
          {Array.from({ length: 5 }).map((_, index) => (
            <VideoGridCardSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }
  export const HomeVideosSectionSkeleton = ()=>{
    return (
      <div className="gap-4 gap-y-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 [@media(min-width:1920px)]:grid-cols-5 [@media(min-width:2200px)]:grid-cols-6">
        {Array.from({ length: 18 }).map((_, index) => (
          <VideoGridCardSkeleton key={index} />
        ))}
      </div>
    );
  }
  export const TrendingVideosSectionSkeleton = ()=>{
    return (
      <div className="gap-4 gap-y-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 [@media(min-width:1920px)]:grid-cols-5 [@media(min-width:2200px)]:grid-cols-6">
        {Array.from({ length: 18 }).map((_, index) => (
          <VideoGridCardSkeleton key={index} />
        ))}
      </div>
    );
  }
  export const SubscriptionVideosSectionSkeleton = ()=>{
    return (
      <div className="gap-4 gap-y-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 [@media(min-width:1920px)]:grid-cols-5 [@media(min-width:2200px)]:grid-cols-6">
        {Array.from({ length: 18 }).map((_, index) => (
          <VideoGridCardSkeleton key={index} />
        ))}
      </div>
    );
  }
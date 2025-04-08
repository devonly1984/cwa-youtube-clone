"use client";

import VideoFormSkeleton from "@/components/skeletons/VideoFormSkeleton";
import { Button } from "@/components/ui/button";
import { trpc } from "@/trpc/client";
import { Suspense, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod';
import { Form } from "@/components/ui/form";
import {z} from 'zod'
import StudioDropDown from "@/components/menus/studio/StudioDropDown";
import { videoUpdateSchema } from "@/db/schema";

import { toast } from "sonner";
import VideoPlayer from "@/components/shared/VideoPlayer";
import Link from "next/link";
import { CopyCheckIcon, CopyIcon } from "lucide-react";
import { BASE_URL, FALLBACK_IMG } from "@/constants";
import {
  CustomTexts,
  SelectForm,
  VideoFooter,
  VisibilityForm,
  ThumbnailUploader,
} from "@/components/forms/studio/custom";
interface VideoFormProps {
  videoId:string;
}

const VideoForm = ({ videoId }: VideoFormProps) => {
  return (
    <Suspense fallback={<VideoFormSkeleton />}>
      <ErrorBoundary fallback={<></>}>
        <VideoFormSuspense videoId={videoId} />
      </ErrorBoundary>
    </Suspense>
  );
};
const VideoFormSuspense = ({ videoId }: VideoFormProps) => {
  const [video] = trpc.studio.getOne.useSuspenseQuery({ id: videoId });
const utils = trpc.useUtils()
const [isCopied, setIsCopied] = useState(false);

const form = useForm<z.infer<typeof videoUpdateSchema>>({
  resolver: zodResolver(videoUpdateSchema),
  defaultValues: video,
});
const update = trpc.videos.update.useMutation({
  onSuccess: () => {
    utils.studio.getMany.invalidate();
    utils.studio.getOne.invalidate({ id: videoId });
  },
  onError: (error) => {
    console.log(error);
    toast.error("Something went wrong", { description: error.message });
  },
});
const onCopy = async ()=>{
  await navigator.clipboard.writeText(`${BASE_URL}/${videoId}`);
  setIsCopied(true);
  setTimeout(() => {
    setIsCopied(false);
  }, 2000);
}
  

  const onSubmit = async (data: z.infer<typeof videoUpdateSchema>) => {
    await update.mutate(data)
  };
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex items-center justify-between mb-6">
            <div className="">
              <h1 className="text-2xl font-bold">Video Details</h1>
              <p className="text-xs text-muted-foreground">
                Manage your video details
              </p>
            </div>
            <div className="flex items-center gap-x-2">
              <Button type="submit" disabled={update.isPending}>
                {update.isPending ? "Saving..." : "Save"}
              </Button>
              <StudioDropDown videoId={video.id} />
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            <div className="space-y-8 lg:col-span-3">
              <CustomTexts
                control={form.control}
                label="Title"
                type="text"
                name="title"
                placeholder="Enter a title"
              />
              <CustomTexts
                control={form.control}
                label="Title"
                type="textarea"
                name="description"
                placeholder="Enter a Description"
              />
              <SelectForm form={form} />
              {/**Thumbnail field */}
              <ThumbnailUploader
              videoId={video.id}
                form={form}
                thumbnailUrl={video.thumbnailUrl ?? FALLBACK_IMG}
              />
            </div>
            <div className="flex flex-col gap-y-8 col-span-2">
              <div className="flex flex-col gap-4 rounded-xl overflow-hidden bg-[#f9f9f9] h-fit">
                <div className="aspect-video overflow-hidden relative">
                  <VideoPlayer
                    playbackId={video.muxPlaybackId}
                    thumbnailUrl={video.thumbnailUrl}
                  />
                </div>
                <div className="p-4 flex flex-col gap-y-6">
                  <div className="flex justify-between items-center gap-x-2">
                    <div
                      className="flex.flex-col.gap-y-1
                  "
                    >
                      <p className="text-xs text-muted-foreground">
                        Video Link
                      </p>
                      <div className="flex items-center gap-x-2">
                        <Link href={`/videos/${video.id}`}>
                          <p className="line-clamp-1 text-sm text-blue-500">
                            {BASE_URL}/{videoId}
                          </p>
                        </Link>
                        <Button
                          type="button"
                          variant={"ghost"}
                          size="icon"
                          className="shrink-0"
                          onClick={onCopy}
                          disabled={isCopied}
                        >
                          {isCopied ? <CopyCheckIcon /> : <CopyIcon />}
                        </Button>
                      </div>
                    </div>
                  </div>
                  <VideoFooter
                    muxStatus={video.muxStatus}
                    trackStatus={video.muxTrackStatus}
                  />
                </div>
              </div>
              <VisibilityForm form={form} />
            </div>
          </div>
        </form>
      </Form>
    </>
  );
};
export default VideoForm;

"use client";

import VideoFormSkeleton from "@/components/skeletons/VideoFormSkeleton";
import { Button } from "@/components/ui/button";
import { trpc } from "@/trpc/client";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormMessage,
  FormItem,
} from "@/components/ui/form";
import {z} from 'zod'
import StudioDropDown from "@/components/menus/studio/StudioDropDown";
import { videoUpdateSchema } from "@/db/schema";
import SelectForm from "@/components/inputs/SelectForm";
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
  const form = useForm<z.infer<typeof videoUpdateSchema>>({
    resolver: zodResolver(videoUpdateSchema),
    defaultValues: video,
  });
  const onSubmit = async (data: z.infer<typeof videoUpdateSchema>) => {
    console.log(data);
  };
  return (
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
            <Button type="submit" disabled={false}>
              Save
            </Button>
            <StudioDropDown />
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="space-y-8 lg:col-span-3">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Add a Title" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      value={field.value ?? ""}
                      rows={10}
                      className="resize-none pr-10"
                      placeholder="Add a description to the video"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <SelectForm form={form} />
            {/**Thumbnail field */}
          </div>
        </div>
      </form>
    </Form>
  );
};
export default VideoForm;

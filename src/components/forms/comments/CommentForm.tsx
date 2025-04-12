"use client"

import UserAvatar from "@/components/shared/UserAvatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { USER_FALLBACK } from "@/constants";
import { commentsInsertSchema } from "@/db/schema";
import { useUser,useClerk } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { trpc } from "@/trpc/client";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { toast } from "sonner";
interface CommentFormProps {
    videoId:string;
    onSuccess?:()=>void;
}
const CommentForm = ({ videoId, onSuccess }: CommentFormProps) => {
    const {user} = useUser()
    const clerk = useClerk()
    const utils = trpc.useUtils()
    const form = useForm<z.infer<typeof commentsInsertSchema>>({
      resolver: zodResolver(commentsInsertSchema),
      defaultValues: {
        videoId,
        value: "",
      },
    });
    const create = trpc.comments.create.useMutation({
        onSuccess:()=>{
            utils.comments.getMany.invalidate({videoId});
            form.reset();
            toast.success("Comment Added");
            onSuccess?.();
        },
        onError: (error)=>{
            toast.error("Something went wrong");
            if (error.data?.code === "UNAUTHORIZED") {
              clerk.openSignIn();
            }
        }
    })
    const handleSubmit = (values: z.infer<typeof commentsInsertSchema>) => {
        create.mutate({
          ...values,
          videoId,
        });
     
    };
  return (
    <Form {...form}>
      <form
        className="flex gap-4 group"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <UserAvatar
          size="lg"
          imageUrl={user?.imageUrl ?? USER_FALLBACK}
          name={user?.username ?? "User"}
        />

        <div className="flex-1">
          <FormField
            control={form.control}
            name="value"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Add a comment..."
                    className="resize-none bg-transparent overflow-hidden min-h-0"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end gap-2 mt-2">
            <Button type="submit" size="sm" disabled={create.isPending}>
              Comment
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};
export default CommentForm
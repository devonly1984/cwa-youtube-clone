import { Loader2Icon } from "lucide-react"

const CommentsSkeleton = () => {
  return (
    <div className="mt-6 flex justify-center items-center">
      <Loader2Icon className="text-muted-foreground size-7 animate-spin" />
    </div>
  );
}
export default CommentsSkeleton
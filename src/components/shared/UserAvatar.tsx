import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { avatarVariants } from "@/constants";
import { cn } from "@/lib/utils";
import type { VariantProps } from "class-variance-authority";
interface UserAvatarProps extends VariantProps<typeof avatarVariants> {
    imageUrl: string;
    name:string;
    className?:string;
    onClick?:()=>void;
}
const UserAvatar = ({
  imageUrl,
  name,
  size,
  className,
  onClick,
}: UserAvatarProps) => {
  return (
    <Avatar
      className={cn(avatarVariants({ size, className }))}
      onClick={onClick}
    >
      <AvatarImage src={imageUrl} alt={name} />
    </Avatar>
  );
};
export default UserAvatar;

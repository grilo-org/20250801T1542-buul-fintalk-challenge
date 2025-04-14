import { FC } from "react";
import { Avatar as AvatarRadixUI } from "radix-ui";
import { AvatarProps } from "./Avatar.types";

const Avatar: FC<AvatarProps> = ({ title, src }) => {
  const getInitials = (name?: string) => {
    if (!name) return "";
    const words = name.split(" ");
    if (words.length === 1) {
      return words[0].substring(0, 2).toUpperCase();
    }
    return (words[0][0] + words[words.length - 1][0]).toUpperCase();
  };
  return (
    <AvatarRadixUI.Root
      className="inline-flex size-[45px] select-none items-center justify-center overflow-hidden rounded-full bg-blackA1 align-middle"
      data-testid="avatar-root"
    >
      <AvatarRadixUI.Image
        className="size-full rounded-[inherit] object-cover"
        src={src}
        alt={title}
        data-testid="avatar-image"
      />
      <AvatarRadixUI.Fallback
        data-testid="avatar-fallback"
        className="leading-1 flex bg-white text-primary-500 size-full items-center justify-center dark:bg-primary-500 dark:text-white text-[15px] font-bold"
        delayMs={600}
      >
        {getInitials(title)}
      </AvatarRadixUI.Fallback>
    </AvatarRadixUI.Root>
  );
};

export default Avatar;

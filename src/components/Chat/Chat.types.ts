import { HTMLAttributes } from "react";

export type ChatProps = HTMLAttributes<Element> & {
  onClose: () => void;
};

import { HTMLAttributes } from "react";

export type ChatProps = HTMLAttributes<Element> & {
  onClose: () => void;
};

export interface Message {
  text: string;
  isUser: boolean;
}

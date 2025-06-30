export interface Message {
  id: string;
  text: string;
  timestamp: string;
  type: "sent" | "received";
}
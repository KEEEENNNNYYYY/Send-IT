export interface Contact {
  id: string;
  name: string;
  avatar: string;
  status: "online" | "away" | "offline";
  lastMessage: string;
  time: string;
  unreadCount: number;
  numeric_id?: number;
}
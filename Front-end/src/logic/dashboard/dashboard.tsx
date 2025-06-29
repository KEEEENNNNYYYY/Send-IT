import { useEffect, useState } from "react";
import axios from "axios";
import DashboardView from "../../view/dashboard/dashboard";
import { useAuthProvider } from "../../hooks/useAuth";

interface Contact {
  id: string;
  name: string;
  avatar: string;
  status: "online" | "away" | "offline";
  lastMessage: string;
  time: string;
  unreadCount: number;
  numeric_id?: number;
}
//ity zan content
interface Message {
  id: string;
  text: string;
  timestamp: string;
  type: "sent" | "received";
}

interface Chat {
  id: string;
  firstUserId: number;
  secondUserId: number;
}

const Dashboard = () => {
  const [selectedContact, setSelectedContact] = useState<string>("1");
  const [contacts, setContacts] = useState<Contact[]>([]);
  // ataoko eto le state anle discussions selon l'user sy contact selectionné
  const [activeChat, setActiveChat] = useState(null);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hey there! How are you doing?",
      timestamp: "10:30 AM",
      type: "received",
    },
    {
      id: "2",
      text: "I'm doing great! Thanks for asking. How about you?",
      timestamp: "10:32 AM",
      type: "sent",
    },
    {
      id: "3",
      text: "Pretty good! Just working on some exciting new projects.",
      timestamp: "10:33 AM",
      type: "received",
    },
    {
      id: "4",
      text: "That sounds awesome! Would love to hear more about it.",
      timestamp: "10:35 AM",
      type: "sent",
    },
  ]);
  const { error, loading, userData } = useAuthProvider();
  if (error) console.log("error", error);

  if (loading) {
    console.log("loading ....");
  }

  const currentContact = contacts.find(
    (contact) => contact.id === selectedContact
  );
  useEffect(() => {
    // à séparer ça bro
    const fetchContacts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/users/all");
        const users = response.data;

        const formattedContacts: Contact[] = users.map((user: any) => {
          const fullName = `${user.first_name} ${user.last_name}`;
          const avatar =
            `${user.first_name[0]}${user.last_name[0]}`.toUpperCase();

          return {
            id: user.id,
            name: fullName,
            avatar: avatar,
            status: "online", // tu peux rendre ça dynamique si tu veux
            lastMessage: "Hello!", // placeholder
            time: "Just now", // placeholder
            unreadCount: 0,
            numeric_id: user.numeric_id, // placeholder
          };
        });

        setContacts(formattedContacts);
      } catch (error) {
        console.error("Erreur lors du chargement des contacts :", error);
      }
    };
    // ity anah ty ko fa zao zao kamo b XDD

    const fetchActiveChat = async () => {
      try {
        const params = {
          first_user_id: userData?.numeric_id,
          second_user_id: currentContact?.numeric_id,
        };
        const response = await axios("http://localhost:5000/api/chat", {
          params: params,
        });
        console.log("active chat data", response.data);
        // l'objectif anle  condition ty micréer chat vao2 rah tsis
        if (
          response.data == "" &&
          userData?.numeric_id &&
          currentContact?.numeric_id
        ) {
          const newChat = {
            firstUserId: userData?.numeric_id,
            secondUserId: currentContact?.numeric_id,
          };
          console.log("new", newChat);

          const res = await axios.post(
            "http://localhost:5000/api/chat",
            newChat,
            {}
          );

          console.log("unexisting chat", res);
        }

        setActiveChat(response.data);
      } catch (error) {
        console.log("error", error);
      }
    };

    const fetchMessages = async () => {
      try {
        const params = {
          senderId: userData?.numeric_id,
          privateChatId: activeChat?.id,
        };
        console.log("active chat",params);
        
        const response = await axios.get(
          "http://localhost:5000/api/chat/content",
          { params: params }
        );
      //  console.log("contents", response.data);
        if (response.data) {
          const activeUserMessages : Message[] = response.data.map((mess: any)=>({
            ...mess,type : "sent"
          }))
          setMessages([...activeUserMessages]);
        }
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchMessages();
    fetchActiveChat();
    fetchContacts();
  }, [selectedContact]);
  //   console.log(userData);

  console.log(activeChat);

  // tokon sarahana anaty /utils.ts na zavatra otrzan
  const handleSendMessage = (text: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      type: "sent",
    };
    setMessages((prev) => [...prev, newMessage]);
    setTimeout(() => {
      const responses = [
        "That's really interesting!",
        "I completely agree with you.",
        "Thanks for sharing that.",
        "Let me think about it.",
        "Sounds like a great plan!",
      ];
      const randomResponse =
        responses[Math.floor(Math.random() * responses.length)];

      const responseMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: randomResponse,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        type: "received",
      };
      setMessages((prev) => [...prev, responseMessage]);
    }, 2000);
  };

  return (
    <DashboardView
      contacts={contacts}
      selectedContact={selectedContact}
      onSelectContact={setSelectedContact}
      contact={currentContact}
      messages={messages}
      onSendMessage={handleSendMessage}
    />
  );
};

export default Dashboard;

import { useEffect, useState } from "react";
import DashboardView from "../../view/dashboard/dashboard";
import { useAuthProvider } from "../../hooks/useAuth";
import { socket } from "../../socket";
import { Message } from "../../types/Message";
import { useChatMessages } from "../../hooks/useMessages";
import { useContacts } from "../../hooks/useContact";
import { getOrCreatePrivateChat } from "../../api/chat";

const Dashboard = () => {
  const [selectedContact, setSelectedContact] = useState<string>("1");
  const  {contacts} = useContacts();
  const {userData} = useAuthProvider();
  const currentContact = contacts.find(
    (contact: { id: string }) => contact.id === selectedContact
  );
  const [activeChat,setActiveChat] = useState(null);
  const messages = useChatMessages(
    //@ts-expect-error nope
    activeChat?.id,
    userData?.numeric_id,
    currentContact?.numeric_id
  );
  useEffect(() => {
    if (userData && currentContact) {
      getOrCreatePrivateChat(userData.numeric_id, currentContact.numeric_id)
        .then(setActiveChat)
        .catch(console.error);
    }
  }, [userData, currentContact]);
  const handleSendMessage = async (text: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      type: "sent",
    };
    // setMessages((prev) => [...prev, newMessage]);
    try {
      socket.emit("sendMessage", {
        text: newMessage.text,
        senderId: userData?.numeric_id,
        //@ts-expect-error nope
        chatId: activeChat?.id,
        timestamp : new Date(),
        type : "sent"
      });
    } catch (error) {
      console.log("error", error);
    }
  };




  return (
    <DashboardView
      contacts={contacts.filter((c)=>c.numeric_id!=userData?.numeric_id)}
      selectedContact={selectedContact}
      onSelectContact={setSelectedContact}
      contact={currentContact}
      messages={messages}
      onSendMessage={handleSendMessage}
    />
  );
};

export default Dashboard;

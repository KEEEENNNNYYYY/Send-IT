import axios from "axios";
import { Contact } from "../types/Contact";
import { useEffect, useState } from "react";
import { api_url } from "../api/chat";

export const useContacts = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [error,setError] = useState<unknown>(null);
  const [loading,setLoading] = useState(true)
  useEffect(() => {
    
    const fetchContacts = async () => {
        try {
        const res = await axios.get(api_url+"/api/users/all");
      const users = res.data;
          console.log("users",users);
          console.log("api url",api_url);
          
          
      const formatted = users.map((user: any) => ({
        id: user.id,
        name: `${user.first_name} ${user.last_name}`,
        avatar: `${user.first_name[0]}${user.last_name[0]}`.toUpperCase(),
        status: "online",
        lastMessage: "Hello!",
        time: "Just now",
        unreadCount: 0,
        numeric_id: user.numeric_id,
      }));
      setContacts(formatted);
    } catch (error) {
     console.log(error);
     setError(error)
    }finally{
      setLoading(false)
    }
    };
    
    fetchContacts();
  }, []);
  return {
    contacts,error,loading
  };
};
